/* eslint-disable no-undef */
((chromeHelper) => {
    // 获取当前选项卡ID
    const tabUrl = chromeHelper.extension.getURL("index.html");
    let tabId = 0;

    const getCurrentTabId = (
        callback,
        options = { active: true, currentWindow: true }
    ) => {
        chromeHelper.tabs.query(options, (tabs) => {
            if (callback) callback(tabs.length ? tabs[0].id : null);
        });
    };

    const openUrlTab = (url, openedId, callback) => {
        const tabOptions = { url: url };
        if (openedId === 0) {
            chromeHelper.tabs.create(tabOptions);
            getCurrentTabId((currentId) => {
                callback(currentId);
            });
        } else {
            chromeHelper.tabs.update(openedId, { active: true }, (res) => {
                if (!res) {
                    chromeHelper.tabs.create(tabOptions);
                    getCurrentTabId((currentId) => {
                        callback(currentId);
                    });
                }
            });
        }
    };
    chromeHelper.browserAction.onClicked.addListener(() => {
        openUrlTab(tabUrl, tabId, (currentId) => {
            tabId = currentId;
        });
    });
})(chrome);
