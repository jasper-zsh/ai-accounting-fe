<template>
    <div class="transaction-type-picker">
        <van-field label="类型" :model-value="typeLabel" readonly clickable @click="showTypePicker = true" />
        <van-popup v-model:show="showTypePicker" round position="bottom">
            <van-picker
                :model-value="[props.modelValue]"
                :columns="typeEnum"
                @cancel="showTypePicker = false"
                @confirm="typeConfirm"
            />
        </van-popup>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { PickerConfirmEventParams } from 'vant';

const props = defineProps<{
    modelValue: string
}>()

const emits = defineEmits<{
    (e: 'update:modelValue', val: string): void;
}>()

const showTypePicker = ref(false)
const typeEnum = [
    { text: '支出', value: 'expense' },
    { text: '收入', value: 'income' },
]

const typeLabel = computed(() => {
    return typeEnum.find(e => e.value === props.modelValue)?.text ?? ''
})


const typeConfirm = (e: PickerConfirmEventParams) => {
    emits('update:modelValue', e.selectedValues[0].toString())
    showTypePicker.value = false
}
</script>