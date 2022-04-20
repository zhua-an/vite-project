<template>
  <ElConfigProvider :locale="locale">
    <div v-if="!store.state.app.appIsRender" v-loading="true" :element-loading-fullscreen="true" :element-loading-lock="true" style="width: 100vw; height: 100vh; position: absolute; top: 0; left: 0; z-index: 99999; background: #fff"></div>
    <template v-if="store.state.app.appIsReady">
      <layout v-if="state.layout === pageTag"></layout>
      <fullscreen-layout v-else></fullscreen-layout>
    </template>
  </ElConfigProvider>
</template>

<script lang="ts">
import "@/assets/style/app.less";
import "@/assets/style/theme/index.less";
import "@/assets/style/theme/mobile.less";

import app from "./constants/app";
import { getLocaleLang, supportLangs } from "./i18n";
import { IObject } from "./types/interface";
import { EPageLayoutEnum, EThemeColor, EThemeSetting } from "./constants/enum";
import { getThemeConfigCache, setThemeColor, updateTheme } from "./utils/theme";
import Layout from "@/layouts/index.vue";
import FullscreenLayout from "@/layouts/fullscreen-layout.vue";

export default defineComponent({
  name: "App",
  components: { Layout, FullscreenLayout },
  setup() {
    const store = useStore();
    const route = useRoute();
    const { t, locale } = useI18n();
    const state = reactive({
      layout: location.href.includes("pop=true") ? EPageLayoutEnum.fullscreen : EPageLayoutEnum.page
    });
    const onInitLang = (vl: string, oldVl?: string) => {
      window.document.querySelector("html")?.setAttribute("lang", vl);
      document.title = t("ui.app.productName");
      if (oldVl && route.path !== "/login") {
        store.commit("app/updateState", { appIsReady: false });
        location.reload();
      }
    };
    onMounted(() => {
      //读取主题色缓存
      const themeCache = getThemeConfigCache();
      const themeColor = themeCache[EThemeSetting.ThemeColor];
      setThemeColor(EThemeColor.ThemeColor, themeColor);
      updateTheme(themeColor);
      onInitLang(getLocaleLang());
    });
    watch(() => locale.value, onInitLang);
    watch(
      () => [route.path, route.query, route.fullPath],
      ([path, query, fullPath]) => {
        store.dispatch({ type: "app/updateState", payload: { activeTabName: fullPath } });
        state.layout = app.fullscreenPages.includes(path as string) || (query as IObject)["pop"] ? EPageLayoutEnum.fullscreen : EPageLayoutEnum.page;
      }
    );
    return {
      store,
      state,
      pageTag: EPageLayoutEnum.page,
      locale: supportLangs[locale.value].el
    };
  }
});
</script>
