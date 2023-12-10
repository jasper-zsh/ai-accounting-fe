<template>
    <div>
        <van-field label="分类" :model-value="categoryLabel" readonly clickable @click="showCategoryPicker = true" />
        <van-popup v-model:show="showCategoryPicker" round position="bottom">
            <van-picker
                :model-value="[modelValue ?? 0]"
                :columns="categoryColumns"
                @cancel="showCategoryPicker = false"
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

const showCategoryPicker = ref(false)

const accountingStore = useAccountingStore()

const categoryLabel = computed(() => {
    return categoryColumns.value.find(c => c.value === props.modelValue)?.text
})
const categoryColumns = computed(() => {
    return [
        { text: '未分类', value: undefined },
        ...accountingStore.categories.map(a => ({ text: a.name, value: a.id }))
    ]
})

const onConfirm = (e: PickerConfirmEventParams) => {
    showCategoryPicker.value = false
    emits('update:modelValue', e.selectedValues[0] as number)
}

onMounted(() => {
    accountingStore.refreshCategories()
})
</script>