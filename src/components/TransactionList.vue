<template>
    <div class="transaction-list">
        <TransactionRecord
            v-for="trans in transactions"
            :key="trans.id"
            :transaction="trans"
            @update="emits('update', $event)"
        />
    </div>
</template>

<script setup lang="ts">
import type { Transaction } from '@/api';
import TransactionRecord from '@/components/TransactionRecord.vue'

const props = defineProps<{
    transactions: Transaction[]
}>()
const emits = defineEmits<{
    (e: 'update', val: Transaction): void
}>()

</script>