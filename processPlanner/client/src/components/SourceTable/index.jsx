import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {useUpdateEffect} from "react-use";

const SourceTable = () => {
    const sourceData = useSelector(({changeData}) => changeData.data);
    const [dataForTable, setDataForTable] = useState([]);

    const paintSourceTable = () => {
        const source = Object.values(sourceData);

        setDataForTable(source[source.length - 1]);
    }

    useUpdateEffect(()=>{
        paintSourceTable();

        if(dataForTable.length > 200){
            console.log("Source data");
            console.log(sourceData);
        }
    }, [sourceData])

    return (
        <div className="input-data-wrapper">
            <div className="input-data-title">
                Исходные данные
            </div>
            <div className="input-data-table">
                <div className="input-data-string input-table-header">
                    <div className="input-data-block">id</div>
                    <div className="input-data-block">Б -> Г</div>
                    <div className="input-data-block">Время работы</div>
                    <div className="input-data-block">Приоритет</div>
                </div>
            </div>
            <div className="input-data-cell-wrapper">
                {dataForTable.length > 0 && dataForTable.length <= 200 && dataForTable.sort((a, b) => a["id"] - b["id"]).map((data, index)=>(
                    <div className="input-data-string" key={`${data}_${index}`}>
                        <div className="input-data-block">{data["id"]}</div>
                        <div className="input-data-block">{data["readyTime"]}</div>
                        <div className="input-data-block">{data["workTime"]}</div>
                        <div className="input-data-block">{data["prior"]}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SourceTable;