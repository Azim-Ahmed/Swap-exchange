import toast from 'react-hot-toast';

export function edgeArrowId(source, target) {
    return `${source}>${target}`;
}
export function saveFlow(elements, nanoid, setOpenMenuClick) {
    const downloadLink = document.createElement("a");
    const fileBlob = new Blob([JSON.stringify(elements, null, 2)], {
        type: "application/json",
    });
    downloadLink.href = URL.createObjectURL(fileBlob);
    downloadLink.download = "square-bear-flow" + nanoid(3) + ".json";
    downloadLink.click();
    setOpenMenuClick(false);
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
export function generateCSVState(elements, valueStream, persona, dispatch, sendValueStreamAndDiagramForCSV, projectId, project, nanoid, nullifiedCSV) {

    if (elements) {
        const newValueStream = valueStream.map((item) => {
            return elements.filter(
                (item1) => item1.data.valueStreamId === item.id && item1
            );
        });
        const newValueStreamFilter = valueStream.map((item, index) => {
            const newObj = {
                valueStreamId: item.id,
                elementsDtoList: newValueStream[index],
                valueStreamName: item.valueStreamName,
                valueStreamWhy: item.valueStreamWhy,
                persona: persona?.name,
            };
            return newObj;
        });
        dispatch(
            sendValueStreamAndDiagramForCSV(
                projectId,
                newValueStreamFilter,
                project?.project?.name + nanoid(2)
            )
        );
        dispatch(nullifiedCSV());
    }
}



export function isoToUtcDate(date) {
    if (!date) {
        return "";
    }
    return date.utc().format("MM/DD/YYYY");
}

export const getSingleAcceptanceCriteria = (text) => {
    if (text) {
        const firstSlpit = text.split("*Given*").join("<strong><br/>Given</strong>");
        const secondSlpit = firstSlpit.split("*When*").join("<strong><br/>When</strong>");
        const preBeforeFinalText = secondSlpit.split("*And given*").join("<strong><br/>And given</strong>");
        const beforeFinalText = preBeforeFinalText.split("*Then*").join("<strong><br/>Then</strong>");
        const finalText = beforeFinalText.split("*And*").join("<strong><br/>And</strong>");
        return finalText;
    }
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
export const changeArrayPositionByIndexNumber = (
    removedIndex,
    newIndex,
    value,
    array
) => {
    let updatedArray = array.filter((v, i) => i !== removedIndex);
    updatedArray.splice(newIndex, 0, value);
    return updatedArray;
};
// let array = [
//     { id: 1, title: 'box-1', values: ['law', 'sosa', 'sim', 'begun'] },
//     { id: 2, title: 'box-2', values: ['tomato'] },
//     { id: 3, title: 'box-3', values: [] },
//     { id: 4, title: 'box-4', values: [] },
// ];
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
export const getItemLabel = (arr, newData) => {
    let newD;
    newD = arr.map(item => {
        if (item.laneId === newData.id) {
            item.laneName = newData.label
        }
        return item;
    })
    return newD;
}

export function check(
    currentObjectID,
    targectObjectID,
    currentArrayValue,
    targetArrayIndex,
    array
) {
    let currentArrayIndex = array
        .find((v) => v.id === currentObjectID)
        .values.findIndex((v) => v === currentArrayValue);

    if (
        currentObjectID !== targectObjectID ||
        currentArrayIndex !== targetArrayIndex
    ) {
        if (currentObjectID !== targectObjectID) {
            let removedArray = array
                .find((v) => v.id === currentObjectID)
                .values.filter((v) => v !== currentArrayValue);

            let addedArray = array.find((v) => v.id === targectObjectID).values;
            addedArray.splice(targetArrayIndex, 0, currentArrayValue);

            let modifiedArray = array.map((v) =>
                v.id === currentObjectID ? { ...v, values: [...removedArray] } : v
            );
            return { changed: true, data: modifiedArray };
        } else {
            let modified = array
                .find((v) => v.id === currentObjectID)
                .values.filter((v) => v !== currentArrayValue);
            modified.splice(targetArrayIndex, 0, currentArrayValue);
            let modifiedArray = array.map((v) =>
                v.id === currentObjectID ? { ...v, values: [...modified] } : v
            );
            return { changed: true, data: modifiedArray };
        }
    } else {
        return { changed: false, data: array };
    }
}
export const validateEmail = (email) => {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
// let { changed, data } = check(2, 2, 'tomato', 0, array);
// console.log(data);
// console.log(changed);

export const pricingCountData = (users) => {
    const getAllData = {};
    let currentUserMoney;
    const lengthOfUsers = users.length;
    if (lengthOfUsers) {
        if (lengthOfUsers === 1) {
            currentUserMoney = 10
        } else if (lengthOfUsers === 2) {
            currentUserMoney = 20
        } else if (lengthOfUsers >= 3) {
            const restMoney = lengthOfUsers * 20;
            currentUserMoney = restMoney - 20
        }
    } else {
        currentUserMoney = 0
    }
    getAllData.nowAddingUsers = lengthOfUsers;
    getAllData.amountToBePaid = currentUserMoney;
    getAllData.totalPaid = currentUserMoney;
    return getAllData;
};

export const _capitalName = (input) => {
    let words = input.split(" ");
    let CapitalizedWords = [];
    if (input === "Pending") {
        return "Take Action";
    } else {
        words.forEach((element) => {
            CapitalizedWords.push(
                element[0].toUpperCase() + element.slice(1, element?.length)
            );
        });
        return CapitalizedWords.join(" ");
    }
};
export const convertArrayToObject = (array, key) => {
    const initialValue = {};
    return array.reduce((obj, item) => {
        return {
            ...obj,
            [item[key]]: item.value,
        };
    }, initialValue);
};


export const getFileType = (file) => {
    // "image/*,application/pdf,.doc,.docx,.ppt,.xls,.xlsx,.zip,.csv,.tsv,.txt,.ppt,.pptx,.pages,.odt,.rtf",
    // "video/*,.mp4,.mkv,.avi,.webm",


}
