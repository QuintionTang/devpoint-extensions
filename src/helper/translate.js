import { i18n } from "@/localization";

function getTranslate(key) {
    return i18n.t(key);
}
/**
 * 获取通知信息的翻译
 * @param {*} key 属性键值
 */
export function notify(key) {
    const _key = ["notifications", key].join(".");
    return getTranslate(_key);
}

export function errors(key) {
    const _key = ["errors", key].join(".");
    return getTranslate(_key);
}
