<template>
    <div>
        <van-field label="账户" :model-value="accountLabel" readonly clickable @click="showAccountPicker = true" />
        <van-popup v-model:show="showAccountPicker" round position="bottom">
            <van-picker
                :model-value="[modelValue ?? 0]"
                :columns="accountColumns"
                @cancel="showAccountPicker = false"
                @confirm="onConfirm"
            />
        </van-popup>
    </div>
</template>

<script setup lang="ts">
import { useAccountingStore } from '@/stores/accounting';
import type { PickerConfirmEventParams } from 'vant';
import { computed, onMounted } from 'vue';
import { ref } from 'vue';

const props = defineProps<{
    modelValue?: number;
}>()
const emits = defineEmits<{
    (e: 'update:modelValue', val: number): void;
}>()

const showAccountPicker = ref(false)

const accountingStore = useAccountingStore()

const accountLabel = computed(() => {
    return accountColumns.value.find(a => a.value === props.modelValue)?.text
})
const accountColumns = computed(() => {
    return [
        { text: '未知账户', value: undefined },
        ...accountingStore.accounts.map(a => ({ text: a.name, value: a.id }))
    ]
})

const onConfirm = (e: PickerConfirmEventParams) => {
    showAccountPicker.value = false
    emits('update:modelValue', e.selectedValues[0] as number)
}

onMounted(() => {
    accountingStore.refreshAccounts()
})
</script>