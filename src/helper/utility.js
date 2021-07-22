import moment from "moment";
import _ from "lodash";

// Get Date
export function convertDate(timestamp, format) {
    const time = timestamp * 1000;
    const formatDate = format || "Y-MM-DD HH:mm";
    return moment(time).format(formatDate);
}
export function convertStrDate(strTime, format = "Y-MM-DD HH:mm") {
    return moment(strTime).format(format);
}
export function defaultValue(val, defVal) {
    if (val && val !== "") {
        return val;
    } else {
        return defVal;
    }
}
/**
 * 解析路由信息
 * @param {*} router
 */
export function getCurrentPath(router) {
    const currentRouter = router.history.current;
    const path = currentRouter.path;
    const arrayPath = path.split("/");
    const query = currentRouter.query;
    return {
        path: arrayPath[arrayPath.length - 1],
        query,
    };
}
export function toFloor(val, precision) {
    return _.floor(val, precision);
}
export function forEach(arrVal, callback) {
    _.forEach(arrVal, callback);
}

export function getValueByKey(arrays, findField, findVal, valueField) {
    const result = _.find(arrays, function (o) {
        return o[findField] === findVal;
    });
    if (result) {
        return result[valueField] || result;
    } else {
        return "";
    }
}
export function createStorageKey() {
    const appHost = window.location.hostname;
    const hostNames = appHost.split(".");
    hostNames.length = 2;
    return hostNames.join(".");
}
export function deepCopy(data) {
    return _.cloneDeep(data);
}
