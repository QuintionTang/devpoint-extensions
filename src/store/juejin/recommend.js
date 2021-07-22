import { juejinApi } from "@/services/juejin";

// action types
export const GET_LIST = "loadList";
export const UPDATE_PAGER = "updatePagination";
// mutation types
export const SET_LIST = "setList";
export const SET_PAGER = "setPagination";
export const SET_READY = "setReady";
export const SET_ERROR = "setError";

const { list, getProfile } = juejinApi();
const getRank = (list, uid) => {
    const index = list.findIndex((item) => item.user_id === uid);
    return index >= 0 ? index + 1 : -1;
};
const state = {
    list: [],
    current: null,
    uid: 0,
    ranking: -1,
    pagination: {
        pageSize: 5,
        current: 1,
        total: 0,
    },
    loading: true,
    errors: null,
};
const getters = {
    allData(state) {
        return state.list;
    },
    ranking: (state) => state.ranking,
    myProfile: (state) => state.current,
    loading(state) {
        return state.loading;
    },
    pagination(state) {
        return state.pagination;
    },
    errors(state) {
        return state.errors;
    },
};

const actions = {
    [GET_LIST]({ commit, dispatch, state }, payload) {
        const { uid } = payload;
        commit(SET_PAGER, payload);
        commit(SET_READY, true);
        getProfile(uid).then((profile) => {
            list(payload)
                .then((response) => {
                    commit(SET_LIST, { list: response, profile });
                })
                .catch((errors) => {
                    commit(SET_ERROR, {
                        loading: false,
                        errors: errors,
                    });
                });
        });
    },
    [UPDATE_PAGER](context, payload) {
        const { pageSize, current } = payload;
        const offset = pageSize * (current - 1);
        payload.offset = offset;
        payload.limit = pageSize;
        actions[GET_LIST](context, payload);
    },
};
const mutations = {
    [SET_PAGER](state, payload) {
        const { orderby, sort, limit, uid, current } = payload;
        const pageCurrent = current + 1;
        Object.assign(state, {
            uid,
            pagination: {
                current: pageCurrent || 1,
                pageSize: limit || 20,
                orderby: orderby,
                sort: sort,
            },
        });
    },
    [SET_ERROR](state, payload) {
        const { loading, errors } = payload;

        Object.assign(state, {
            loading,
            errors,
        });
    },
    [SET_READY](state, isReady) {
        Object.assign(state, {
            loading: isReady,
            errors: null,
        });
    },
    [SET_LIST](state, { list, profile }) {
        const { data } = list;
        const ranking = getRank(data, state.uid);
        const current = ranking >= 0 ? data[ranking - 1] : profile;
        Object.assign(state, {
            list: data,
            loading: false,
            ranking,
            current,
        });
        Object.assign(state, {
            pagination: {
                current: state.current + 1,
                total: data.length || 20,
                ...state.pagination,
            },
        });
    },
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
};
