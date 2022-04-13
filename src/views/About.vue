<template>
    <div>About {{ test }}</div>
    <el-icon :size="20">
    <edit />
  </el-icon>
</template>

<style scoped>

</style>

<script setup lang="ts">
import { computed } from 'vue';


let a = 1;
setInterval(() => {
    a++
}, 1000)
</script>
