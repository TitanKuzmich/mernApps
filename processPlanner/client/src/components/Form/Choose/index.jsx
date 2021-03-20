import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useUpdateEffect} from "react-use";
import {useMessage} from "../../../hooks/message.hook";
import {useHttp} from "../../../hooks/http.hook";

import Subsection from "../../SubSection";
import Button from "../../Button";
import DropDown from "../DropDown";
import Switch from "../Switch";

import style from "./style.module.scss";

import {
    changeFifoData,
    changeFifoStats,
    changeMainData,
    changeStrfData, changeStrfStats,
    changeWithTrace
} from "../../../redux/actions/changeData";

const Choose = () => {
    const dispatch = useDispatch();
    const {request, error, clearError} = useHttp();
    const message = useMessage();

    const mainData = useSelector(({changeData}) => changeData.data)

    const [withTrace, setWithTrace] = useState(false);
    const [data, setData] = useState({options: {value: "", label: ""}});
    const [dropOptions, setDropOptions] = useState([]);
    const [isValid, setValid] = useState(false);

    const getOptions = useCallback(async () => {
        try {
            const result = await request('api/data/all', 'GET')
            const options = []

            if (result.exists.length <= 0) {
                options.push({value: "нет сохраненных данных", label: "нет сохраненных данных", disabled: true})
                setDropOptions(options)
                return
            }

            result.exists.forEach(option => {
                options.push({value: option.name, label: option.name})
            })

            setDropOptions(options)
        } catch (e) {}
    }, [])

    const onLoadSelect = async () => {
        try {
            console.log(data)
            const processed = await request('/api/data/process', 'POST', {name: data.options.label, withTrace: withTrace});

            message(processed.message)
            dispatch(changeMainData(processed.source));
            dispatch(changeFifoData(processed.fifoData));
            dispatch(changeFifoStats(processed.fifoStats));
            dispatch(changeStrfData(processed.strfData));
            dispatch(changeStrfStats(processed.strfStats));
        } catch(e) {

        }
    }

    const onDeleteItem = async (id) => {
        try {
            const result = await request('api/data/remove', 'DELETE', {name: id})
            await getOptions()

            message(result.message)
        } catch (e) {}
    }

    useEffect(() => {
        getOptions();
    }, [mainData])

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

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
                            options={dropOptions}
                            placeholder="Название"
                            onSelect={(option) => (
                                setData({
                                    ...data,
                                    options: { ...data.options, value: option.value, label: option.label }
                                })
                            )}
                            selected={{ value: data.options.value, label: data.options.label }}
                            noWrap
                            onDeleteItem={onDeleteItem}
                        />
                    </div>

                    <Button disabled={!isValid}
                            onClick={onLoadSelect}>
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