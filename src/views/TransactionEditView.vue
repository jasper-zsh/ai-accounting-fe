<template>
    <div class="transaction-edit-view">
        <van-nav-bar title="流水详情" left-arrow @click-left="back" />
        <van-cell-group inset>
            <van-field label="金额" v-model="amount" readonly clickable @click="showAmountKeyboard = true" />
            <TransactionTypePicker v-model="type" />
            <AccountPicker v-model="account" />
            <CategoryPicker v-model="category" />
            <van-field label="备注" v-model="comment" />
        </van-cell-group>
        <div class="space"></div>
        <div class="actions">
            <van-button type="success" block @click="save">保存</van-button>
        </div>
        <van-number-keyboard
            :show="showAmountKeyboard"
            theme="custom"
            extra-key="."
            close-button-text="完成"
            @blur="showAmountKeyboard = false"
            v-model="amount"
        />
        
    </div>
</template>

<style lang="less" scoped>
.transaction-edit-view {
    height: 100%;
    display: flex;
    flex-direction: column;
    .space {
        flex: 1;
    }
    .actions {
        padding: 1rem;
    }
}
</style>

<script setup lang="ts">
import { transactionApi } from '@/remote';
import { onMounted } from 'vue';
import { ref } from 'vue';
import AccountPicker from '@/components/AccountPicker.vue';
import CategoryPicker from '@/components/CategoryPicker.vue';
import TransactionTypePicker from '@/components/TransactionTypePicker.vue';

const loading = ref(false)
const showAmountKeyboard = ref(false)


const props = defineProps<{
    id?: string;
}>()

const amount = ref('0')
const type = ref<string>('')


const account = ref<number>()
const category = ref<number>()
const comment = ref()

const back = () => {
    history.back()
}

const load = async () => {
    if (!props.id) {
        return
    }
    loading.value = true
    try {
        const res = await transactionApi.getTransaction({
            id: props.id,
        })
        amount.value = Math.abs(res.amount / 100).toFixed(2)
        type.value = res.type
        account.value = res.accountId
        category.value = res.categoryId
        comment.value = res.comment
    } finally {
        loading.value = false
    }
}

const save = async () => {
    if (!props.id) {
        return
    }
    loading.value = true
    try {
        const a = Number.parseInt((Number.parseFloat(amount.value) * 100).toFixed(0))
        await transactionApi.updateTransaction({
            id: props.id,
            transactionUpdate: {
                amount: ['expense'].indexOf(type.value) >= 0 ? -a : a,
                // @ts-expect-error narrowed enum
                type: type.value,
                accountId: account.value,
                categoryId: category.value,
                comment: comment.value,
            }
        })
        history.back()
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    load()
})
</script>