<template>
    <div class="transaction-record">
        <van-cell
            :title="`${categoryName} - ${transaction.comment}`"
            :label="`${transTime} - ${accountName}`"
            :value="amount"
            :value-class="transaction.type"
        />
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
        color: rgb(150, 12, 12);
    }
}
</style>

<script setup lang="ts">
import type { Transaction } from '@/api';
import { useAccountingStore } from '@/stores/accounting';
import { computed } from 'vue';
import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(RelativeTime)

const props = defineProps<{
    transaction: Transaction;
}>()

const accountingStore = useAccountingStore()

const categoryName = computed(() => {
    if (props.transaction.categoryId) {
        const category = accountingStore.categoryMap[props.transaction.categoryId]
        if (category) {
            return category.name
        } else {
            return '加载中'
        }
    } else {
        return '未分类'
    }
})

const accountName = computed(() => {
    if (props.transaction.accountId) {
        const account = accountingStore.accountMap[props.transaction.accountId]
        if (account) {
            return account.name
        } else {
            return '加载中'
        }
    } else {
        return '未知账户'
    }
})

const transTime = computed(() => {
    return dayjs(props.transaction.time).fromNow()
})

const amount = computed(() => {
    return (props.transaction.amount / 100)
})
</script>