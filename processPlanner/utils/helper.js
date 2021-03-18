const pushData = (arr, state) => {
    arr.push(state)
}

const processArray = (data, withTrace = true) => {
    let resultArr = [],
        resultItem = [],
        lastWorkTime = 0

    resultItem.push(data[0]["id"])

    for(let j = 0; j < data[0]["readyTime"]; j++){
        pushData(resultItem, 0)
    }
    for(let j = 0; j < data[0]["workTime"]; j++){
        pushData(resultItem, 2)
    }

    lastWorkTime = resultItem.length
    resultArr.push(resultItem)

    for(let i = 1; i < data.length; i++){
        resultItem = []
        resultItem.push(data[i]["id"])

        for(let j = 0; j < data[i]["readyTime"]; j++){
            pushData(resultItem, 0)
        }

        if(lastWorkTime > (data[i]["readyTime"])){
            let diff = lastWorkTime - data[i].readyTime

            for(let j = 0; j < diff - 1; j++){
                pushData(resultItem, 1)
            }
        }

        for(let j = 0; j < data[i]["workTime"]; j++){
            pushData(resultItem, 2)
        }

        lastWorkTime = resultItem.length
        resultArr.push(resultItem)
    }

    let maxLength = resultArr.length - 1

    for(let i = 0; i < resultArr.length; i++){
        for(let j = resultArr[i].length; j < resultArr[maxLength].length; j++)
            pushData(resultArr[i], 0)
    }

    resultArr.sort((a, b) => a[0] - b[0])

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

    return resultArr
}

const calcStats = (processedData) => {
    const result = {}

    let t_o = 0
    let t_i = 0
    for (let i = 0; i < processedData.length; i++){
        for (let j = 1; j < processedData[i].length; j++){
            if( processedData[i][j] === 1){
                t_i+=1
                t_o+=1
            }
            else if(processedData[i][j] === 2){
                t_i+=1
            }
        }
    }

    result.averageWait = (t_o/processedData.length).toFixed(3)
    result.averageWork = (t_i/processedData.length).toFixed(3)

    return  result;
}

module.exports = {
    processArray: processArray,
    calcStats: calcStats
}