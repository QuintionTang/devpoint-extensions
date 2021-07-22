import apiClient from "@/services/axios";

export const juejinApi = () => {
    const ENDPOINT = "/author/recommend";
    const USER_ENDPOINT = "/user/get";
    const list = (payload) => {
        const { filter, orderby, sort, offset, limit } = payload;
        return apiClient
            .get(`${ENDPOINT}`, {
                params: { orderby, sort, cursor: offset, limit },
                filter,
            })
            .then((response) => {
                return response;
            });
    };
    const getProfile = (uid) => {
        return apiClient
            .get(`${USER_ENDPOINT}`, {
                params: { user_id: uid, not_self: 1 },
            })
            .then((response) => {
                return response;
            });
    };

    return {
        list,
        getProfile,
    };
};
