import axios from "axios";
import { notification } from "ant-design-vue";
import { translate } from "@/helper";

const apiClient = axios.create({
    baseURL: "https://api.juejin.cn/user_api/v1",
});
apiClient.interceptors.request.use((request) => {
    let { params, filter } = request;
    if (filter) {
        params = Object.assign({}, params, filter);
        request.params = params;
    }

    return request;
});
// interceptors 拦截器
apiClient.interceptors.response.use(
    (response) => {
        if (response.data.err_no === 0) {
            if (Number.isFinite(response.data.count)) {
                return {
                    data: response.data.data,
                    ...response.data,
                };
            } else {
                return response.data.data || response.data;
            }
        } else {
            return Promise.reject(response.data);
        }
    },
    (error) => {
        // Errors handling
        let message = "";
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    message = translate.errors("noauth");
                    break;
                case 404:
                    message = translate.errors("nopage");
                    break;
                default:
                    message = error.response.data || translate.errors("system");
            }
        } else {
            message = error;
        }
        notification.warning({
            message: message,
        });
    }
);
export default apiClient;
