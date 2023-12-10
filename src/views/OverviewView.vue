<template>
    <div class="overview-view">
        <div class="container">
            <van-pull-refresh style="min-height: 100%;" v-model="loading" @refresh="load">
                <van-cell-group title="概要">
                    <OverviewCell
                        ref="todayCell"
                        name="今天"
                        :start="dayjs().startOf('day').toISOString()"
                        load-last
                    />
                    <OverviewCell
                        ref="thisWeekCell"
                        :start="dayjs().startOf('week').toISOString()"
                        :end="dayjs().endOf('week').toISOString()"
                        name="本周"
                    />
                    <OverviewCell
                        ref="thisMonthCell"
                        :start="dayjs().startOf('month').toISOString()"
                        :end="dayjs().endOf('month').toISOString()"
                        name="本月"
                    />
                </van-cell-group>
            </van-pull-refresh>
        </div>
        <div class="van-safe-area-bottom"></div>
    </div>
</template>

<style lang="less" scoped>
.overview-view {
    height: 100%;
    .container {
        height: 100%;
        overflow: scroll;
        display: flex;
        flex-direction: column;
        .expense {
            font-weight: bold;
            font-size: 1rem;
            color: rgb(12, 107, 12);
        }
        .income {
            color: rgb(150, 12, 12);
            font-weight: bold;
            font-size: 1rem;
        }
    }
}
</style>

<script setup lang="ts">
import type { Transaction } from '@/api';
import { onMounted } from 'vue';
import { ref } from 'vue';
import { transactionApi } from '@/remote';
import dayjs from 'dayjs';
import OverviewCell from '@/components/OverviewCell.vue';

const loading = ref(false)
const transactions = ref<Transaction[]>([])
const todayCell = ref<InstanceType<typeof OverviewCell>>()
const thisWeekCell = ref<InstanceType<typeof OverviewCell>>()
const thisMonthCell = ref<InstanceType<typeof OverviewCell>>()

const loadRecentTransactions = async () => {
    const res = await transactionApi.paginateTransactions({
        limit: 20,
        page: 1,
        paginateTransactionsRequest: {
            filters: {},
        }
    })
    // @ts-ignore
    transactions.value = res.data
}

const load = () => {
    console.log('load')
    loading.value = true
    Promise.all([
        loadRecentTransactions(),
        todayCell.value?.load(),
        thisWeekCell.value?.load(),
        thisMonthCell.value?.load(),
    ]).finally(() => {
        loading.value = false
    })
}

onMounted(() => {
    load()
})
</script>