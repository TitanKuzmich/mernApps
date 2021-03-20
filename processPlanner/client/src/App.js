import React from 'react'
import {useSelector} from "react-redux";

import 'materialize-css'

import Generate from "./components/Form/Generate";
import Load from "./components/Form/Load";
import Choose from "./components/Form/Choose";
import SourceTable from "./components/SourceTable";
import AlgoTable from "./components/AlgoTable";

import style from "./style.module.scss";

function App() {

    const fifoData = useSelector(({changeData})=> changeData.fifoData);
    const fifoStats = useSelector(({changeData})=> changeData.fifoStats);
    const strfData = useSelector(({changeData})=> changeData.strfData);
    const strfStats = useSelector(({changeData})=> changeData.strfStats);

    return (
        <div className="container">
            <div className={style.sourceWrapper}>
                <div className={style.formWrapper}>
                    <Generate />
                    <Load />
                    <Choose />
                </div>
                <SourceTable/>
            </div>

            <AlgoTable name={"Алгоритм FIFO"} data={fifoData} stats={fifoStats}/>
            <AlgoTable name={"Алгоритм STRF"} data={strfData} stats={strfStats}/>
        </div>
    );
}

export default App;
