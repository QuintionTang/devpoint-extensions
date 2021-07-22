import localeAntd from "ant-design-vue/lib/locale-provider/zh_CN";

const messages = {
    topBar: {
        issuesHistory: "发布历史",
        projectManagement: "项目管理",
        typeToSearch: "搜索...",
        findPages: "查找页面...",
        actions: "动作",
        status: "状态",
        profileMenu: {
            hello: "你好",
            role: "角色",
            email: "电子邮件",
            mobile: "联系电话",
            editProfile: "基本信息",
            logout: "退出",
        },
    },
    pageTitles: {
        login: "账号登录",
    },
    buttons: {
        login: "登录",
    },
    notifications: {
        logged: {
            message: "登录成功",
            description: "您已成功DevPoint",
        },
    },
    errors: {
        noauth: "请先登录！",
        nopage: "请求地址不存在，请检查！",
        system: "系统错误",
    },
};

export default {
    locale: "zh-CH",
    localeAntd,
    messages,
};
