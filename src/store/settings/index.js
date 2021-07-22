import Vue from "vue";
import Vuex from "vuex";
import { useStorage, cleanAll } from "@/helper/storage";

Vue.use(Vuex);
const settingsStorage = useStorage("settings");
const VERSION_NO = process.env.VUE_APP_VERSION;
const STORED_SETTINGS = (storedSettings) => {
    const settings = { lastVersion: VERSION_NO };
    const localSettings = settingsStorage.get();
    Object.keys(storedSettings).forEach((key) => {
        const item = localSettings[key];
        settings[key] =
            typeof item !== "undefined" ? item : storedSettings[key];
    });
    return settings;
};
// action types
export const CHANGE = "changeSettings";
export const CHANGE_VERSION = "checkUpgrading";
export const CHANGE_THEME = "changeTheme";
export const CHANGE_PRIMARY = "changePrimaryColor";
export const SETUP_URL = "setupUrl";

// mutation types
export const CHANGE_SETTINGS = "setSettings";
export const SETUP_URL_SETTINGS = "setupUrl";
export const SET_PRIMARY_COLOR = "setPrimary";
export const SET_THEME = "setTheme";

const state = {
    ...STORED_SETTINGS({
        logo: "DevPoint",
        description: "DevPoint插件",
        locale: "zh-CN",
        isSidebarOpen: false,
        isMobileView: false,
        isMobileMenuOpen: false,
        isMenuCollapsed: false,
        menuLayoutType: "",
        menuType: "default",
        routerAnimation: "slide-fadein-right",
        menuColor: "dark",
        flyoutMenuColor: "blue",
        authPagesColor: "image",
        theme: "default",
        primaryColor: "#1b55e3",
        isMenuUnfixed: false,
        isMenuShadow: false,
        isCardShadow: true,
        isBorderless: false,
        version: VERSION_NO,
    }),
};
const getters = {
    currentTheme: (state) => state.theme,
    currentPrimaryColor: (state) => state.primaryColor,
    appLogo: (state) => state.logo,
    appDescription: (state) => state.description,
    menuType: (state) => state.menuType,
    isMenuCollapsed: (state) => state.isMenuCollapsed,
    flyoutMenuColor: (state) => state.flyoutMenuColor,
    isMenuUnfixed: (state) => state.isMenuUnfixed,
    isMenuShadow: (state) => state.isMenuShadow,
    menuColor: (state) => state.menuColor,
    menuLayoutType: (state) => state.menuLayoutType,
    isMobileMenuOpen: (state) => state.isMobileMenuOpen,
    isMobileView: (state) => state.isMobileView,
    isTabletView: (state) => state.isTabletView,
    isCardShadow: (state) => state.isCardShadow,
    isBorderless: (state) => state.isBorderless,
    routerAnimation: (state) => state.routerAnimation,
    authPagesColor: (state) => state.authPagesColor,
};
const actions = {
    [CHANGE_VERSION]({ dispatch, state, commit }) {
        const { lastVersion, version } = state;
        if (lastVersion !== version) {
            commit(CHANGE_SETTINGS, {
                setting: "version",
                value: lastVersion,
            });
            cleanAll();
        }
    },
    [CHANGE]({ commit }, payload) {
        commit(CHANGE_SETTINGS, payload);
    },
    [CHANGE_PRIMARY]({ commit }, payload) {
        commit(SET_PRIMARY_COLOR, payload);
    },
    [CHANGE_THEME]({ commit }, payload) {
        commit(SET_THEME, payload);
    },
    [SETUP_URL]({ commit }, payload) {
        commit(SETUP_URL_SETTINGS, payload);
    },
};
const mutations = {
    [CHANGE_SETTINGS](state, { setting, value }) {
        state[setting] = value;
        settingsStorage.save(state);
    },
    [SET_THEME](state, payload) {
        const { theme } = payload;
        const nextTheme = theme === "dark" ? "dark" : "default";
        document
            .querySelector("html")
            .setAttribute("data-kit-theme", nextTheme);
        state.theme = nextTheme;
        // 更新版本

        settingsStorage.save(state);
    },
    [SET_PRIMARY_COLOR](state, payload) {
        const { color } = payload;
        const addStyles = () => {
            const styleElement = document.querySelector("#primaryColor");
            if (styleElement) {
                styleElement.remove();
            }
            const body = document.querySelector("body");
            const styleEl = document.createElement("style");
            const css = document.createTextNode(
                `:root { --kit-color-primary: ${color};}`
            );
            styleEl.setAttribute("id", "primaryColor");
            styleEl.appendChild(css);
            body.appendChild(styleEl);
        };
        addStyles();
        state.primaryColor = color;

        settingsStorage.save(state);
    },
    [SETUP_URL_SETTINGS](state, payload) {
        let queryParams = payload;
        let keys = false;
        if (payload.redirect) {
            const str = payload.redirect;
            const subs = str.substring(str.indexOf("?") + 1);
            if (str.indexOf("?") >= 0) {
                queryParams = JSON.parse(
                    '{"' +
                        decodeURI(subs)
                            .replace(/"/g, '\\"')
                            .replace(/&/g, '","')
                            .replace(/=/g, '":"') +
                        '"}'
                );
            }
        }
        delete queryParams.redirect;
        keys = Object.keys(queryParams);
        if (keys.length) {
            keys.forEach((key) => {
                let value;
                switch (queryParams[key]) {
                    case "false":
                        value = false;
                        break;
                    case "true":
                        value = true;
                        break;
                    default:
                        value = queryParams[key];
                        break;
                }
                if (key in state) {
                    state[key] = value;
                }
            });
        }
    },
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
};
