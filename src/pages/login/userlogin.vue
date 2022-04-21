<template>
  <el-form class="login-form"
           status-icon
           :rules="loginRules"
           ref="loginFormRef"
           :model="loginForm"
           label-width="0">
    <el-form-item prop="username">
      <el-input @keyup.enter="handleLogin(loginFormRef)"
                v-model="loginForm.username"
                auto-complete="off"
                :placeholder="$t('login.username')">
        <template #prefix>
          <el-icon class="el-input__icon"><user /></el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input @keyup.enter="handleLogin(loginFormRef)"
                :type="passwordType"
                v-model="loginForm.password"
                auto-complete="off"
                :placeholder="$t('login.password')">
        <template #prefix>
          <el-icon class="el-input__icon"><lock /></el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="code">
      <el-input @keyup.enter="handleLogin(loginFormRef)"
                :maxlength="code.len"
                v-model="loginForm.code"
                auto-complete="off"
                :placeholder="$t('login.code')">
        <template #prefix>
          <i class="icon-yanzhengma"></i>
        </template>
        <template #append>
          <div class="login-code">
            <span class="login-code-img"
                  @click="refreshCode"
                  v-if="code.type == 'text'">{{code.value}}</span>
            <img :src="code.src"
                 class="login-code-img"
                 @click="refreshCode"
                 v-else />
          </div>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" :disabled="loading"
                 @click.prevent="handleLogin(loginFormRef)"
                 class="login-submit">{{$t('login.submit')}}</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>

</style>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'

const router = useRouter()
const store = useStore()
const loginFormRef = ref<FormInstance>()
const loginForm = reactive({
  username: "admin",
  password: "123456",
  code: "1234",
  redomStr: "1234"
})
const code = reactive({
  src: "",
  value: "1234",
  len: 4,
  type: "text"
})
const loading = ref(false)
const passwordType = ref('password')
const validateCode = (rule: any, value: any, callback: any) => {
  if (code.value != value) {
    loginForm.code = "";
    refreshCode();
    callback(new Error("请输入正确的验证码"));
  } else {
    callback();
  }
};
const loginRules = reactive<FormRules>({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" }
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, message: "密码长度最少为6位", trigger: "blur" }
  ],
  code: [
    { required: true, message: "请输入验证码", trigger: "blur" },
    { min: 4, max: 4, message: "验证码长度为4位", trigger: "blur" },
    { required: true, trigger: "blur", validator: validateCode }
  ]
})

const refreshCode = () => {
  loginForm.redomStr = '1234';
  code.type == "text"
        ? (code.value = '2345')
        : (code.src = `/${loginForm.redomStr}`);
      loginForm.code = code.value;
}

const showPassword = () => {
  passwordType.value == ""
        ? (passwordType.value = "password")
        : (passwordType.value = "");
}

const handleLogin = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      loading.value = true
      console.log('submit!')
      store.dispatch("user/LoginByUsername", loginForm).then(() => {
        router.push("/");
        loading.value = false
      }).catch(() => {
        loading.value = false
      })
    } else {
      console.log('error submit!')
      return false
    }
  })
}

</script>
