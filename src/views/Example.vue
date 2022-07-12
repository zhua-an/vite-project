<template>
    <div>
        <p>这是ref绑定的值，5s后更改：{{ refText }}</p>
        <p>这是对象绑定的值，5s后更改：{{ reactiveText.text }}</p>
        <p>这是vuex绑定的值，5s后更改：{{ getText }}</p>
        <p>这是网络请求示例一，5s后更改：{{ api1Text.text }}</p>
        <p>这是网络请求示例二，5s后更改：{{ api2Text.text }}</p>
        <p>这是网络请求示例三，5s后更改：{{ api3Text.text }}</p>
        <el-pagination
            :current-page="elCPage"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="elPageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            style="justify-content: center;"
        >
        </el-pagination>
        <el-button type="primary" round @click="changeLanguage">
            {{ $t('buttons.changeLanguage') }}
        </el-button>
    </div>
</template>

<style scoped>

</style>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useStore } from '@/store';
import { i18n, setLanguage } from '@/i18n';

let refText = ref("未修改");
let reactiveText = ref({text: "未修改"});
let api1Text = ref({text: "未修改"});
let api2Text = ref({text: "未修改"});
let api3Text = ref({text: "未修改"});

let elPageSize = ref(100);
let elCPage = ref(1);

function changeLanguage() {
    // setLanguage(i18n.global.locale === "zh-cn" ? 'en' : 'zh-cn')
}

function handleSizeChange(val: number) {
    elPageSize.value = val
}

function handleCurrentChange(val: number) {
    elCPage.value = val
}

const st = useStore();

let getText = computed(()=>{return st.getters["user/getText"]});

let timer1 = setTimeout(() => {
    refText.value = "已修改";
    reactiveText.value.text = "已修改";
    st.dispatch("user/setText", { text: "已修改" }, {root: true})
    clearTimeout(timer1)
}, 5000);


</script>
