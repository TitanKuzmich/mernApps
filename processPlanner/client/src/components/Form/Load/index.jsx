import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addMainData, algoProcess} from "../../../redux/actions/changeData";

import Subsection from "../../SubSection";
import Button from "../../Button";

import style from "./style.module.scss";

const Load = () => {

    const withTrace = useSelector(({changeData})=> changeData.withTrace);

    const [data, setData] = useState([]);
    const [name, setFileName] = useState("");

    const dispatch = useDispatch();

    const [isValid, setValid] = useState(false);

    const onUpload = () => {
        dispatch(addMainData(data));
        dispatch(algoProcess(data, withTrace));
    }

    useEffect(() => {
        if (uploadRef.current.value) {
            setValid(true)
        } else {
            setValid(false)
        }
    }, [data])

    const uploadRef = useRef(null);

    const loadFileProcess = () => {        // функция асинхронная
        let reader = new FileReader();                   // создаем файловую переменную

        reader.readAsText(uploadRef.current.files[0]); // считываем данные из файла асинхронно

        reader.onerror = () => {                         // не удалось загрузить файл
            return reader.error
        };

        reader.onload = () => {                          // ждем, пока файл загрузится
            let loadData = [];
            let boof = reader.result.split("\n");          // разбиваем текст в файле на масив строк
            for (let i = 0; i < boof.length; i++) {        // пройтись по каждой строке
                let data = [];                               // создать бач
                let t = boof[i].split(", ")                  // разбить строку на подстроки
                t[3] = t[3].split(";")[0]                    // удалить символ ;
                data.id = Number(t[0]);                      // добавить в него id
                data.readyTime = Number(t[1]);               // добавить в него время подачи заявки
                data.workTime = Number(t[2]);                // добавить в него время работы
                data.prior = Number(t[3]);                   // добавить в него приоритет
                loadData.push(data);                         // загрузить элемент бача в массив
            }
            setData(loadData);                               //возвращаем данные из промиса
        };
    }

    useEffect(() => {
        uploadRef &&
        setFileName(uploadRef.current.value.split("\\")[uploadRef.current.value.split("\\").length - 1])
    }, [data])

    return (
        <Subsection.Wrapper>
            <Subsection.Label text="Загрузить исходные данные:"/>
            <Subsection.Content>
                <div className={style.optionWrapper}>
                    <label className={style.label}>
                        <i className="material-icons">attach_file</i>
                        { name ?
                            <span className={style.title} id="upload_text">{name}</span>
                            : <span className={style.title} id="upload_text">Добавить файл</span>}
                        <input className={style.upload}
                               ref={uploadRef}
                               onChange={loadFileProcess}
                               id="upload_input"
                               type="file"
                               accept=".doc, .docx, .txt"/>
                    </label>
                </div>

                <Button disabled={!isValid}
                    onClick={onUpload}
                >
                    Загрузить
                </Button>
            </Subsection.Content>
        </Subsection.Wrapper>
    );
}

export default Load;