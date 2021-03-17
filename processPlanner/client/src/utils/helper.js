import {jStat} from "jstat"

const MEAN_TIME = 20,
    LOGBASE = 0.8;

const getBaseLog = (x, y) => {
    return Math.log(y) / Math.log(x);
}

const pushData = (arr, state) => {
    arr.push(state)
}

export const generate = async (tasksNum) => {
    return new Promise((resolve => {
        let mainArr = [];

        for (let i = 0; i < tasksNum; i++) {
            let data = [];
            data.id = Math.floor(Math.random() * tasksNum);
            data.readyTime = Math.floor(jStat.normal.sample(MEAN_TIME, MEAN_TIME));
            if (data.readyTime < 0) data.readyTime = 0;
            data.workTime = Math.floor(getBaseLog(LOGBASE, 1 - Math.random())) + 1;
            data.prior = 5;
            mainArr.push(data);
        }

        resolve(mainArr);
    }))
}

export const processArray = (data, withTrace = true) => {
    let resultArr = [],
        resultItem = [],
        lastWorkTime = 0;

    resultItem.push(data[0]["id"]);

    for(let j = 0; j < data[0]["readyTime"]; j++){
        pushData(resultItem, 0)
    }
    for(let j = 0; j < data[0]["workTime"]; j++){
        pushData(resultItem, 2)
    }

    lastWorkTime = resultItem.length;
    resultArr.push(resultItem)

    for(let i = 1; i < data.length; i++){
        resultItem = [];
        resultItem.push(data[i]["id"]);

        for(let j = 0; j < data[i]["readyTime"]; j++){
            pushData(resultItem, 0)
        }

        if(lastWorkTime > (data[i]["readyTime"])){
            let diff = lastWorkTime - data[i].readyTime;

            for(let j = 0; j < diff - 1; j++){
                pushData(resultItem, 1)
            }
        }

        for(let j = 0; j < data[i]["workTime"]; j++){
            pushData(resultItem, 2)
        }

        lastWorkTime = resultItem.length;
        resultArr.push(resultItem);
    }

    let maxLength = resultArr.length - 1;

    for(let i = 0; i < resultArr.length; i++){
        for(let j = resultArr[i].length; j < resultArr[maxLength].length; j++)
            pushData(resultArr[i], 0);
    }

    resultArr.sort((a, b) => a[0] - b[0]);

    if(withTrace){
        for(let i = 0; i < resultArr.length-1; i++){
            if(resultArr[i][0] === resultArr[i+1][0]){
                for(let j = 1; j < resultArr[i].length; j++){
                    if(resultArr[i][j] > resultArr[i+1][j])
                        resultArr[i+1][j] = resultArr[i][j]
                }
                resultArr.splice(i, 1)
                i-=1
            }
        }
    }

    return resultArr;
}

export const calcStats = (processedData) => {
    let t_o = 0;
    let t_i = 0;
    for (let i = 0; i < processedData.length; i++){
        for (let j = 1; j < processedData[i].length; j++){
            if( processedData[i][j] === 1){
                t_i+=1;
                t_o+=1;
            }
            else if(processedData[i][j] === 2){
                t_i+=1;
            }
        }
    }

    let result = "Среднее время ожидания: " + (t_o/processedData.length).toFixed(3) + " Среднее время исполнения: " + (t_i/processedData.length).toFixed(3);

    return  result;
}