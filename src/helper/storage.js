import { deepCopy, createStorageKey } from "./utility";

/**
 * localStorage 本地存储
 * @param {*} valKey
 * @returns
 */
export const useStorage = (valKey = "authorization") => {
    const storageKey = createStorageKey();
    const localKey = `${valKey}.${storageKey}`;
    const save = (data) => {
        window.localStorage.setItem(localKey, JSON.stringify(deepCopy(data)));
    };

    const get = () => {
        const localData = window.localStorage.getItem(localKey);
        if (localData && localData !== "") {
            return JSON.parse(localData);
        } else {
            return false;
        }
    };
    /**
     * 清楚localStorage
     */
    const clear = () => {
        window.localStorage.setItem(localKey, "");
    };
    return {
        save,
        get,
        clear,
    };
};
export const cleanAll = () => {
    window.localStorage.clear();
};
