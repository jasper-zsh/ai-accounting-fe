<template>
    <div class="profile-view">
        <van-nav-bar title="设置"></van-nav-bar>
        <van-cell-group title="记账">
            <van-cell title="分类设置" is-link :to="{ name: 'categories' }"></van-cell>
        </van-cell-group>
        <van-cell-group title="用户">
            <van-cell title="退出登录" is-link @click="logout"></van-cell>
        </van-cell-group>
    </div>
</template>

<script setup lang="ts">
import { authApi } from '@/remote';
import { showSuccessToast } from 'vant';
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = async () => {
    await authApi.authLogoutGet()
    showSuccessToast('已退出登录')
    router.replace({
        name: 'login',
    });
}
</script>