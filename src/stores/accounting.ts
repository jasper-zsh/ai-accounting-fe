import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Account, Category } from '@/api'
import { accountApi, categoryApi } from '@/remote'

export const useAccountingStore = defineStore('accounting', () => {
  const accounts = ref<Account[]>([])
  const accountMap = ref<{[key: number]: Account}>({})
  const loadingAccounts = ref(false)
  const categories = ref<Category[]>([])
  const categoryMap = ref<{[key: number]: Category}>({})
  const loadingCategories = ref(false)

  async function refreshAccounts() {
    loadingAccounts.value = true
    try {
      accounts.value = await accountApi.listAccounts()
      for (const account of accounts.value) {
        accountMap.value[account.id] = account
      }
    } finally {
      loadingAccounts.value = false
    }
  }

  async function refreshCategories() {
    loadingCategories.value = true
    try {
      categories.value = await categoryApi.listCategories()
      for (const category of categories.value) {
        categoryMap.value[category.id] = category
      }
    } finally {
      loadingCategories.value = false
    }
  }

  return {
    accounts, accountMap, loadingAccounts, categories, categoryMap, loadingCategories, refreshAccounts, refreshCategories
  }
})