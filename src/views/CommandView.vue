<template>
    <div class="command-view">
        <div class="container">
            <transition name="van-fade">
                <div class="button" v-if="!speaking" @click="startSpeaking">
                    <van-icon name="volume-o" size="8rem" />
                </div>
                <div class="button stop" v-else @click="stopSpeaking">
                    <van-icon name="stop-circle-o" size="8rem" />
                </div>
            </transition>
        </div>
    </div>
</template>

<style lang="less" scoped>
.command-view {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .container {
        position: relative;
        width: 15rem;
        height: 15rem;
    }
    .button {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        border-radius: 7.5rem;
        background-color: rgb(255, 240, 220);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .stop {
        background-color: rgb(253, 225, 172);
    }
}
</style>

<script setup lang="ts">
import { ref } from 'vue';
import { showFailToast, showNotify } from 'vant';
import { aiApi } from '@/remote';
import { onMounted } from 'vue';
import { useAccountingStore } from '@/stores/accounting';
import 'vant/es/notify/style';
import 'vant/es/toast/style';

const speaking = ref(false)

let recorder: MediaRecorder|undefined
let voiceData: Blob[] = []

function arrayBufferToBase64(buffer: ArrayBuffer) {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

const startSpeaking = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        recorder = new MediaRecorder(stream, {
            mimeType: 'audio/webm;codesc=opus',
            audioBitsPerSecond: 16000,
        })
        voiceData = []
        recorder.ondataavailable = async (e) => {
            voiceData.push(e.data)
        }
        recorder.onstop = async (e) => {
            const blob = new Blob(voiceData)
            const data = arrayBufferToBase64(await blob.arrayBuffer())
            speaking.value = false;
            try {
                const res = await aiApi.aiVoicePost({
                    aiVoicePostRequest: {
                        voice: data,
                    },
                })
                showNotify({
                    type: 'success',
                    message: res.content,
                })
            } catch (e) {
                showFailToast('识别失败')
            }
        }
        recorder.start()
        speaking.value = true;
    } catch (e) {
        showFailToast('无法使用麦克风')
        speaking.value = false;
    }
}

const stopSpeaking = async () => {
    recorder?.stop()
    
}

const accountingStore = useAccountingStore()

onMounted(() => {
    accountingStore.refreshAccounts()
})
</script>