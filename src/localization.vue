<template>
    <a-config-provider :locale="locale">
        <router-view />
    </a-config-provider>
</template>

<script>
import Vue from "vue";
import VueI18n from "vue-i18n";

import { mapState } from "vuex";
import chinese from "@/locales/zh-CN";

const locales = {
    "zh-CN": chinese,
};

Vue.use(VueI18n);
export const i18n = new VueI18n({
    locale: "zh-CN",
    fallbackLocale: "zh-CN",
    messages: {
        "zh-CN": locales["zh-CN"].messages,
    },
});

export default {
    name: "Localization",
    mounted() {
        this.$i18n.locale = this.settings.locale;
    },
    computed: {
        ...mapState(["settings"]),
        locale() {
            return locales[this.settings.locale].localeAntd;
        },
    },
    watch: {
        "settings.locale": function (value) {
            this.$i18n.locale = value;
        },
    },
};
</script>
