<template>
    <div class="transaction-record">
        <van-swipe-cell>
            <van-cell
                center
                :title="`${transaction.category?.name ?? '未分类'}${transaction.comment ? ' - ' + transaction.comment : ''}`"
                :label="`${transTime} - ${transaction.account?.name ?? '未知账户'}`"
                :value="formatMoney(transaction.amount)"
                :value-class="transaction.type"
                :to="{ name: 'transactionEdit', params: { id: transaction.id } }"
            />
            <template #right>
                <van-button square block style="height: 100%" type="danger" text="删除" @click="deleteTransaction" :loading="loading" />
            </template>
        </van-swipe-cell>
        
    </div>
</template>

<style lang="less">
.transaction-record {
    .expense {
        span {
            font-weight: bold;
            font-size: 1.5rem;
            color: rgb(12, 107, 12);
        }
    }
    .income {
        span {
            color: rgb(150, 12, 12);
            font-weight: bold;
            font-size: 1.5rem;
        }
    }
}
</style>

<script setup lang="ts">
import type { Transaction } from '@/api';
import { computed } from 'vue';
import dayjs from 'dayjs';
import Calendar from 'dayjs/plugin/calendar';
import { ref } from 'vue';
import { transactionApi } from '@/remote';
import { formatMoney } from '@/utils/strings';
dayjs.extend(Calendar)

const props = defineProps<{
    transaction: Transaction;
}>()
const emits = defineEmits<{
    (event: 'update', msg: Transaction): void;
}>()
const loading = ref(false)

const transTime = computed(() => {
    return dayjs(props.transaction.time).calendar(null, {
        sameDay: 'HH:mm',
        lastDay: '昨天 HH:mm',
        lastWeek: 'MM-DD HH:mm',
        sameElse: 'YYYY-MM-DD',
    })
})

const deleteTransaction = async () => {
    loading.value = true
    try {
        await transactionApi.deleteTransaction({
            id: props.transaction.id,
        })
        emits('update', props.transaction)
    } finally {
        loading.value = false
    }
}

</script>