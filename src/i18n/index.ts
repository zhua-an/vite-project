import app from "@/constants/app";
import { IObject } from "@/types/interface";
import { CacheLang } from "../constants/cacheKey";
import { getCache } from "@/utils/cache";
import { createI18n } from "vue-i18n";

export function loadLanguages(): IObject {
    const context = import.meta.globEager("./languages/*.ts");

    const languages: IObject = {};

    let langs = Object.keys(context);
    for (let key of langs) {
        if (key === "./index.ts") continue;
        let lang = context[key].lang;
        let name = key.replace(/(\.\/languages\/|\.ts)/g, '');
        // try {
        //     if (name === "en") console.log('?????')
        //     // const elLang = await import(`element-plus/lib/locale/lang/en`) as  IObject;
        //     let elLang = await import(`element-plus/lib/locale/lang/${name}`) as IObject;
        //     lang = Object.assign(lang, {el: elLang.deafault.default.el})
        // } catch (error) {}
        languages[name] = lang
    }
    
    return languages
}

/**
 * 索引语言字段 src/i18n/lang 为框架语言 src/i18n/page 为业务界面语言
 */
 export const supportLangs: IObject = loadLanguages()

/**
 * 取语言名称
 * @param lang
 * @returns
 */
 export const getLangName = (lang: string): string => {
  return supportLangs[lang]?.langName;
};

/**
 * 取默认语言
 * @returns
 */
 export const getLocaleLang = (): string => {
    const lang = getCache(CacheLang, { isParse: false }, app.defaultLang);
    return lang;
  };

export const i18n = createI18n({
    // globalInjection: true,
    // legacy: false,
    locale: getLocaleLang(),
    fallbackLocale: app.defaultLang,
    messages: loadLanguages()
})

export const i18nt = i18n.global.t

export function setLanguage(locale: string) {
    i18n.global.locale = locale
}