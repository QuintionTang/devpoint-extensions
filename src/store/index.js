import Vue from "vue";
import Vuex from "vuex";

import settings from "./settings";
import juejinRecommend from "./juejin/recommend";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        settings,
        juejinRecommend,
    },
    state: {},
    mutations: {},
    actions: {},
});
