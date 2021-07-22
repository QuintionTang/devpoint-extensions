module.exports = {
    pwa: {
        iconPaths: {
            favicon32: "./statics/icons/logo-32.png",
            favicon16: "./statics/icons/logo-16.png",
            appleTouchIcon: "./statics/icons/logo-256.png",
            maskIcon: "./statics/icons/favicon.png",
            msTileImage: "./statics/icons/favicon.png",
        },
    },
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true,
            },
        },
    },
    publicPath: "/",
    lintOnSave: true,
};
