<template>
    <div id="app">
        <localization></localization>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Localization from "@/localization";
export default {
    name: "app",
    components: { Localization },
    computed: {
        ...mapGetters("settings", ["currentTheme", "currentPrimaryColor"]),
        nextRoute() {
            return this.$route.query.redirect || "/";
        },
        currentRoute() {
            return this.$route.path;
        },
    },
    mounted() {
        this.checkUpgrading();
        // this.getCurrentAccount();
        this.changePrimaryColor({
            color: this.currentPrimaryColor,
        });
        this.changeTheme({ theme: this.currentTheme });
    },
    watch: {
        currentTheme(theme) {
            this.changeTheme({ theme });
        },
        $route(to, from) {
            const query = Object.assign({}, to.query);
            this.setupUrl(query);
        },
    },
    methods: {
        ...mapActions("settings", [
            "checkUpgrading",
            "changeTheme",
            "changePrimaryColor",
            "setupUrl",
        ]),
    },
};
</script>
