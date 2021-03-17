export const fifo = (array) => {
    array.sort(( a, b ) =>  a["readyTime"] - b["readyTime"]);

    return array;
}

export const strf = (array) => {
    let globalTime = 0;
    array.sort((a, b) => a["readyTime"] - b["readyTime"]);
    for (let i = 0; i < array.length; i++) {

        for (let j = i; j < array.length; j++) {

            if (globalTime < array[j]["readyTime"]) {
                break;
            }
            if (array[i]["workTime"] > array[j]["workTime"]) {
                let t = array[i];
                array[i] = array[j];
                array[j] = t;
            }
        }
        globalTime += array[i]["workTime"];
    }

    return array;
}