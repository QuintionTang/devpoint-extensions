import apiClient from "@/services/axios";

export const juejinApi = () => {
    const ENDPOINT = "/author/recommend";

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

    return {
        list,
    };
};
