import toast from 'react-hot-toast';

export function edgeArrowId(source, target) {
    return `${source}>${target}`;
}
export function toJSON(elements,) {
    const downloadLink = document.createElement("a");
    const fileBlob = new Blob([JSON.stringify(elements, null, 2)], {
        type: "application/json",
    });
    downloadLink.href = URL.createObjectURL(fileBlob);
    downloadLink.download = "square-bear-flow.json";
    downloadLink.click();
}
export function WordCount(str) {
    return str.split(" ");
}
//WordCountLength
export function WordCountLength(str) {
    return str.split(" ").length;
}
export const redirectUrl = (domHostname, url) => {
    console.log(domHostname)
    let hostEnv;
    if (domHostname === "localhost:3000") {
        hostEnv = `http://${domHostname}/${url}?secretKey=`;
    } else {
        hostEnv = `https://${domHostname}/${url}?secretKey=`;
    }
    return hostEnv;
};
//SUCCESS ALERT
export const successAlert = message => message && toast.success(message);
// Error Alert
export const errorAlert = error => error && toast.error(error);
//SHOWING ERROR MESSAGE
export const handleErrorMessage = err =>
    err.response && (err.response.data.message || err.response.data.error)
        ? err.response.data.message || err.response.data.error
        : err.message || err.error;
//DOWNLOAD__CSV
export function downloadFile(fileName, urlData) {
    var aLink = document.createElement("a");
    aLink.download = fileName;
    aLink.href = urlData;
    var event = new MouseEvent("click");
    aLink.dispatchEvent(event);
}
export function handleDownloadTheCSVFromBackend(fileName, urlData) {
    var aLink = document.createElement("a");
    aLink.download = fileName;
    aLink.href = urlData;
    var event = new MouseEvent("click");
    aLink.dispatchEvent(event);
}

export function isoToUtcDate(date) {
    if (!date) {
        return "";
    }
    return date.utc().format("MM/DD/YYYY");
}

export function removeDuplicates(arr) {
    return arr.filter((item,
        index) => arr.indexOf(item) === index);
}
export function addDuplicates(arr) {
    return arr.filter((item,
        index) => arr.indexOf(item) === index);
}
export const checkduplicity = (arrayData) => {
    const itemsData = arrayData.filter((value, index) => {
        const _value = JSON.stringify(value);
        return (
            index ===
            arrayData.findIndex((obj) => {
                return JSON.stringify(obj) === _value;
            })
        );
    });
    return itemsData;
}
export const validateEmail = (email) => {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
export const convertArrayToObject = (array, key) => {
    const initialValue = {};
    return array.reduce((obj, item) => {
        return {
            ...obj,
            [item[key]]: item.value,
        };
    }, initialValue);
};
