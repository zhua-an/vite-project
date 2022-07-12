<template>
  <el-form class="login-form"
           status-icon
           :rules="loginRules"
           ref="loginFormRef"
           :model="loginForm"
           label-width="0">
    <el-form-item prop="phone">
      <el-input @keyup.enter="handleLogin(loginFormRef)"
                v-model="loginForm.phone"
                auto-complete="off"
                :placeholder="$t('ui.login.phone')">
        <template #prefix>
          <el-icon class="el-input__icon"><Cellphone /></el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="code">
      <el-input @keyup.enter="handleLogin(loginFormRef)"
                v-model="loginForm.code"
                auto-complete="off"
                :placeholder="$t('ui.login.code')">
        <template #prefix>
          <el-icon class="el-input__icon"><lock /></el-icon>
        </template>

        <template #append>
          <span @click="handleSend"
                class="msg-text"
                :class="[{display:msgKey}]">{{msgText}}</span>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :disabled="loading"
                 @click.prevent="handleLogin(loginFormRef)"
                 class="login-submit">{{$t('ui.login.submit')}}</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { isMobile } from '@/utils/utils'
import { ElMessage } from "element-plus"
import { i18nt } from '@/i18n'

const { t } = useI18n();
const router = useRouter()
const store = useStore()
const loginFormRef = ref<FormInstance>()
const loginForm = reactive({
  phone: "",
  code: ""
})
const msgText = ref('')
const msgTime = ref('')
const msgKey = ref(false)

const loading = ref(false)
const validatePhone = (rule: any, value: any, callback: any) => {
  if (value || !isMobile(value)) {
    callback(new Error(t("ui.login.rules.phone")));
  } else {
    callback();
  }
};
const validateCode = (rule: any, value: any, callback: any) => {
  if (value.length != 4) {
    callback(new Error(t("ui.login.rules.captcha4")));
  } else {
    callback();
  }
};

const loginRules = reactive<FormRules>({
  phone: [{ required: true, trigger: "blur", validator: validatePhone }],
  code: [{ required: true, trigger: "blur", validator: validateCode }]
})

onMounted(() => {
  msgText.value = config.value.MSGINIT;
  msgTime.value = config.value.MSGTIME + '';
})

const config = computed(() => {
  return {
    MSGINIT: t("ui.login.msgText"),
    MSGSCUCCESS: t("ui.login.msgSuccess"),
    MSGTIME: 60
  }
})

const handleSend = () => {
  if (msgKey.value) return;
  msgText.value = msgTime.value + config.value.MSGSCUCCESS;
  msgKey.value = true;
  const time = setInterval(() => {
    msgTime.value = (Number(msgTime.value) - 1) + '';
    msgText.value = msgTime.value + config.value.MSGSCUCCESS;
    if (Number(msgTime.value) == 0) {
      msgTime.value = config.value.MSGTIME + '';
      msgText.value = config.value.MSGINIT;
      msgKey.value = false;
      clearInterval(time);
    }
  }, 1000);
}

const handleLogin = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      loading.value = true
      store.dispatch("user/LoginByPhone", loginForm).then(() => {
        ElMessage.success(i18nt("ui.login.loginOk"));
        router.push("/");
        loading.value = false
      }).catch((error) => {
        loading.value = false
        console.log(error)
        ElMessage.error('未知错误');
      })
    } else {
      console.log('error submit!')
      return false
    }
  })
}

</script>