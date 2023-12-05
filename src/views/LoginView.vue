<template>
    <div class="login-view">
        <van-nav-bar
            title="Login"
        />
        <van-form @submit="login">
            <van-cell-group inset title="Login to start your english tour!">
                <van-field
                    name="username"
                    v-model="username" 
                    label="Username"
                    placeholder="John Doae"
                    :rules="[{ required: true, message: 'Username is required' }]"
                />
                <van-field
                    type="password"
                    v-model="password"
                    name="password"
                    label="Password"
                    placeholder="Password"
                    :rules="[{ required: true, message: 'Password is required' }]"
                />
            </van-cell-group>
            <div class="actions">
                <van-button round block type="primary" native-type="submit">Login</van-button>
                <van-button round block :to="{ name: 'register' }">Register & Login</van-button>
            </div>
            
        </van-form>
    </div>
</template>

<style lang="less">
.login-view {
    .actions {
        padding: 2rem;
        
        >button {
            margin-bottom: 1rem;
        }
    }
}
</style>

<script setup lang="ts">
import { authApi } from '@/remote';
import { showNotify } from 'vant';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import 'vant/es/notify/style';

const router = useRouter();

const username = ref('');
const password = ref('');

const login = async () => {
    try {
        await authApi.authLoginPost({
            loginRequest: {
                username: username.value,
                password: password.value,
            }
        })
        showNotify({
            type: 'success',
            message: 'Login succeed',
        })
        router.replace({
            name: 'overview',
        })
    } catch (e: any) {
        switch (e.response.status) {
            case 401:
                showNotify({
                    type: 'warning',
                    message: 'Wrong username or password',
                })
                break;
        }
    }
}
</script>