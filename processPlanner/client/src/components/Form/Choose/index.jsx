import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";

import Subsection from "../../SubSection";
import Button from "../../Button";
import DropDown from "../DropDown";
import Switch from "../Switch";

import style from "./style.module.scss";

import {changeWithTrace} from "../../../redux/actions/changeData";

const Choose = () => {
    const dispatch = useDispatch();

    const [withTrace, setWithTrace] = useState(false);
    const [data, setData] = useState({options: {value: "", label: ""}});
    const [isValid, setValid] = useState(false);

    const getOptions = (minVal, maxValue, step) => {
        const options = []
        for (let num = minVal; num <= maxValue; num += step) {
            options.push({ value: num, label: num.toString() });
        }

        return options
    }

    useEffect(() => {
        if (data.options.label.length) {
            setValid(true)
        } else {
            setValid(false)
        }
    }, [data])

    useEffect(() => {
        dispatch(changeWithTrace(withTrace));
    }, [withTrace])

    return (
        <>
            <Subsection.Wrapper>
                <Subsection.Label text="Загрузить исходные данные:"/>
                <Subsection.Content>
                    <div className={style.optionWrapper}>
                        <div className={style.titleModal}>Выбрать из раннее загруженных:</div>
                        <DropDown
                            options={getOptions(5, 60, 5)}
                            placeholder="10"
                            onSelect={(option) => {
                                setData({
                                    ...data,
                                    options: { ...data.options, value: option.value, label: option.label }
                                })
                            }}
                            selected={{ value: data.options.value, label: data.options.label }}
                            noWrap
                        />
                    </div>

                    <Button disabled={!isValid}>
                        Загрузить
                    </Button>
                </Subsection.Content>
            </Subsection.Wrapper>

            <Subsection.Wrapper>
                <Subsection.Label text="Включить трассировочную печать:"/>
                <Subsection.Content>
                    <div className={style.optionWrapper}>
                        <div className={style.titleModal}>Печать с трассировкой:</div>
                        <div className={style.inputModal}>
                            <Switch checked={withTrace}
                                    onChange={() => {
                                        setWithTrace(!withTrace)
                                    }}/>
                        </div>
                    </div>
                </Subsection.Content>
            </Subsection.Wrapper>
        </>
    );
}

export default Choose;