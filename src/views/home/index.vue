<template>
    <div v-if="!loading">
        <div class="my-profile mb-2" v-if="myProfile">
            <div class="row">
                <div class="col-md-12">
                    <div class="widget profile-widget">
                        <div class="bg-black-op">
                            <div
                                class="ribbon-box font-w600"
                                v-if="ranking > 0"
                            >
                                {{ ranking }}
                            </div>
                            <img
                                :src="myProfile.avatar_large"
                                class="profile-image"
                                :alt="myProfile.user_name"
                            />
                            <h1>{{ myProfile.user_name }}</h1>
                            <p>{{ myProfile.description }}</p>
                            <a
                                :href="`https://juejin.cn/user/${myProfile.user_id}`"
                                target="_blank"
                                class="btn btn-sm"
                                >主页</a
                            >
                            <ul class="stats widget-inline-list clearfix">
                                <li class="col-4">
                                    <span>{{ myProfile.got_digg_count }}</span>
                                    <strong>赞</strong>
                                </li>
                                <li class="col-4">
                                    <span>{{ myProfile.got_view_count }}</span>
                                    <strong>阅读</strong>
                                </li>
                                <li class="col-4">
                                    <span>{{ myProfile.level }}</span>
                                    <strong>等级</strong>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="profile-ranking">
            <template v-for="(profile, index) in allData">
                <div class="col-md-12" :key="index">
                    <div :class="`widget profile-widget widget${index % 10}`">
                        <div class="bg-black-op">
                            <div class="ribbon-box font-w600">
                                {{ index + 1 }}
                            </div>
                            <img
                                :src="profile.avatar_large"
                                class="profile-image"
                                :alt="profile.user_name"
                            />
                            <h1>{{ profile.user_name }}</h1>
                            <p>{{ profile.description }}</p>
                            <a
                                :href="`https://juejin.cn/user/${profile.user_id}`"
                                target="_blank"
                                class="btn btn-sm"
                                >主页</a
                            >
                            <ul class="stats widget-inline-list clearfix">
                                <li class="col-4">
                                    <span>{{ profile.got_digg_count }}</span>
                                    <strong>赞</strong>
                                </li>
                                <li class="col-4">
                                    <span>{{ profile.got_view_count }}</span>
                                    <strong>阅读</strong>
                                </li>
                                <li class="col-4">
                                    <span>{{ profile.level }}</span>
                                    <strong>等级</strong>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { getCurrentPath } from "@/helper/utility";
export default {
    name: "JuejinHome",
    data: () => {
        return {
            uid: "4406498333033918",
        };
    },
    mounted() {
        const router = getCurrentPath(this.$router);
        const query = router.query;
        this.getList(query.uid || this.uid);
    },
    watch: {
        $route(to) {
            const query = Object.assign({}, to.query);
            this.getList(query.uid || this.uid);
        },
    },
    computed: {
        ...mapGetters("juejinRecommend", [
            "loading",
            "allData",
            "myProfile",
            "ranking",
        ]),
    },
    methods: {
        ...mapActions("juejinRecommend", ["loadList"]),
        getList(uid) {
            this.loadList({
                uid,
                offset: 0,
                limit: 100,
            });
        },
    },
};
</script>
