<template>
    <div :class="{ air__layout__grayBackground: true }">
        <a-layout
            :class="{
                air__layout__grayBackground: true,
                air__layout__squaredBorders: true,
                air__layout__cardsShadow: isCardShadow,
                air__layout__borderless: isBorderless,
            }"
        >
            <a-layout>
                <a-layout-content>
                    <div class="air__utils__content p-0">
                        <transition :name="routerAnimation" mode="out-in">
                            <router-view />
                        </transition>
                    </div>
                </a-layout-content>
            </a-layout>
        </a-layout>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    name: "MainLayout",
    computed: {
        ...mapGetters("settings", [
            "isMobileView",
            "isTabletView",
            "isCardShadow",
            "routerAnimation",
            "menuLayoutType",
            "isBorderless",
        ]),
    },
    components: {},
    mounted() {
        this.detectViewPort(true);

        window.addEventListener("resize", this.detectViewPortListener);
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.detectViewPortListener);
    },
    methods: {
        ...mapActions("settings", ["changeSettings"]),
        detectViewPortListener: function () {
            this.detectViewPort(false);
        },
        setViewPort: function (isMobileView = false, isTabletView = false) {
            this.changeSettings({
                setting: "isMobileView",
                value: isMobileView,
            });
            this.changeSettings({
                setting: "isTabletView",
                value: isTabletView,
            });
        },
        detectViewPort: function (firstLoad = false) {
            const isMobile = this.isMobileView;
            const isTablet = this.isTabletView;
            const width = window.innerWidth;
            const state = {
                next: {
                    mobile: width < 768,
                    tablet: width < 992,
                    desktop: !(width < 768) && !(width < 992),
                },
                prev: {
                    mobile: isMobile,
                    tablet: isTablet,
                    desktop: !isMobile && !isTablet,
                },
            };
            // desktop
            if (
                state.next.desktop &&
                (state.next.desktop !== state.prev.desktop || firstLoad)
            ) {
                this.setViewPort(false, false);
            }
            // tablet & collapse menu
            if (
                state.next.tablet &&
                !state.next.mobile &&
                (state.next.tablet !== state.prev.tablet || firstLoad)
            ) {
                this.setViewPort(false, true);
                this.changeSettings({
                    setting: "isMenuCollapsed",
                    value: true,
                });
            }
            // mobile
            if (
                state.next.mobile &&
                (state.next.mobile !== state.prev.mobile || firstLoad)
            ) {
                this.setViewPort(true, false);
            }
        },
    },
};
</script>
