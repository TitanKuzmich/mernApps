import {jStat} from "jstat"

const MEAN_TIME = 20,
    LOGBASE = 0.8;

const getBaseLog = (x, y) => {
    return Math.log(y) / Math.log(x);
}

export const generate = async (tasksNum) => {
    return new Promise((resolve => {
        let mainArr = [];

        for (let i = 0; i < tasksNum; i++) {
            let data = {};
            data.id = Math.floor(Math.random() * tasksNum);
            data.readyTime = Math.floor(jStat.normal.sample(MEAN_TIME, MEAN_TIME));
            if (data.readyTime < 0) data.readyTime = 0;
            data.workTime = Math.floor(getBaseLog(LOGBASE, 1 - Math.random())) + 1;
            data.prior = 5;
            mainArr.push(data);
        }

        mainArr.sort((a, b) => a.id - b.id)

        resolve(mainArr);
    }))
}