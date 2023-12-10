<template>
    <div class="account-list-view">
        <van-nav-bar title="账户" right-text="新建" @click-right="showCreateDialog = true" />
        <van-pull-refresh style="flex: 1" v-model="accountingStore.loadingAccounts" @refresh="load">
            <van-list>
                <van-swipe-cell
                    v-for="account in accountingStore.accounts"
                    :key="account.id"
                >
                    <van-cell
                        :title="account.name"
                        :value="((amounts[account.id] ?? 0) / 100).toFixed(2)"
                        :to="{ name: 'transactionList', query: { accountId: account.id } }"
                    ></van-cell>
                    <template #right>
                        <van-button square text="编辑" @click="showEditAccount(account)" />
                        <van-button square type="danger" text="删除" @click="deleteAccount(account)" :loading="deleting" />
                    </template>
                </van-swipe-cell>
            </van-list>
        </van-pull-refresh>
        <van-dialog v-model:show="showCreateDialog" title="新建账户" show-cancel-button :before-close="addAccount">
            <van-field v-model="accountName" placeholder="账户名称" :rules="[{ required: true }]" />
        </van-dialog>
        <van-dialog v-model:show="showEditDialog" title="编辑账户" show-cancel-button :before-close="editAccountClosed">
            <van-field v-model="editAccountName" placeholder="账户名称" :rules="[{ required: true }]" />
        </van-dialog>
    </div>
</template>

<style lang="less" scoped>
.account-list-view {
    height: 100%;
    display: flex;
    flex-direction: column;
}
</style>

<script setup lang="ts">
import { accountApi, transactionApi } from '@/remote';
import { useAccountingStore } from '@/stores/accounting';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { showFailToast } from 'vant';
import type { Account } from '@/api';
import 'vant/es/toast/style';
import { computed } from 'vue';

const accountingStore = useAccountingStore()
const showCreateDialog = ref(false)
const showEditDialog = ref(false)
const accountName = ref('')
const editAccountName = ref('')
let editAccount: Account|undefined
const deleting = ref(false)
const loadingAmounts = ref(false)
const amounts = ref<Record<number, number>>({})

const loading = computed({
    get() {
        return accountingStore.loadingAccounts && loadingAmounts.value
    },
    set(val: boolean) {
        loading.value = val
    }
})

const addAccount = async (action: any) => {
    if (action !== 'confirm') {
        return true
    }
    if (accountName.value.length === 0) {
        return false
    }
    try {
        await accountApi.createAccount({
            createAccountRequest: {
                name: accountName.value,
            },
        })
        accountName.value = ''
        await accountingStore.refreshAccounts()
        return true
    } catch (e) {
        showFailToast('发生错误')
        return true
    }
}


const showEditAccount = (account: Account) => {
    editAccountName.value = account.name
    editAccount = account
    showEditDialog.value = true
}

const editAccountClosed = async (action: any) => {
    if (action !== 'confirm') {
        return true
    }
    if (editAccountName.value.length === 0) {
        return false
    }
    try {
        await accountApi.updateAccount({
            id: editAccount!.id,
            createAccountRequest: {
                name: editAccountName.value,
            },
        })
        await accountingStore.refreshAccounts()
        editAccountName.value = ''
        editAccount = undefined
        return true
    } catch (e) {
        showFailToast('发生错误')
        return true
    }
}

const deleteAccount = async (account: Account) => {
    deleting.value = true
    try {
        await accountApi.deleteAccount({
            id: account.id,
        });
        await accountingStore.refreshAccounts()
    } catch (e: any) {
        showFailToast('删除失败')
    } finally {
        deleting.value = false
    }
}

const loadAmounts = async () => {
    loadingAmounts.value = true
    try {
        const res = await transactionApi.groupTransactions({
            groupTransactionsRequest: {
                filters: {},
                groupBy: ['accountId']
            }
        })
        res.forEach(r => {
            amounts.value[r.accountId!] = r.amount
        })
    } finally {
        loadingAmounts.value = false
    }
}

const load = () => {
    loadAmounts()
    accountingStore.refreshAccounts()
}

onMounted(() => {
    load()
})
</script>