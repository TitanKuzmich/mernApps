import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import Subsection from "../../SubSection";
import Input from "../Input";
import Button from "../../Button";

import style from "./style.module.scss";

import {generate} from "../../../utils/helper";
import {addMainData, algoProcess} from "../../../redux/actions/changeData";

const Generate = () => {

    const dispatch = useDispatch();

    const withTrace = useSelector(({changeData})=> changeData.withTrace);

    const [data, setData] = useState({name: "", procNums: ""});
    const [isValid, setValid] = useState(false);

    const onGenerate = async () => {
        let rawData = await generate(data.procNums);
        dispatch(addMainData(rawData));
        dispatch(algoProcess(rawData, withTrace));
    }

    useEffect(() => {
        if (data.name.length > 1 && data.procNums > 0) {
            setValid(true)
        } else {
            setValid(false)
        }
    }, [data])

    return (
        <Subsection.Wrapper>
            <Subsection.Label text="Сгенерировать данные:"/>
            <Subsection.Content>
                <div className={style.optionWrapper}>
                    <div className={style.titleModal}>Дайте имя объекту выходных данных:</div>
                    <div className={style.inputModal}>
                        <Input placeholder="Имя"
                               disabled={false}
                               value={data.name}
                               onChange={e =>
                                   setData({
                                       ...data,
                                       name: e.target.value
                                   })
                               }/>
                    </div>
                </div>

                <div className={style.optionWrapper}>
                    <div className={style.titleModal}>
                        Введите количесвто процессов:
                        <div className="tooltip">(если процессов >200, печать таблиц отключается)</div>
                    </div>
                    <div className={style.inputModal}>
                        <Input placeholder="20"
                               disabled={false}
                               value={data.procNums}
                               onChange={e =>
                                   setData({
                                       ...data,
                                       procNums: e.target.value
                                   })
                               }
                               pattern="[^0][0-9]+$|^[1-9]+$"/>
                    </div>
                </div>

                <Button onClick={onGenerate}
                    disabled={!isValid}>
                    Сгенерировать
                </Button>
            </Subsection.Content>
        </Subsection.Wrapper>
    );
}

export default Generate;