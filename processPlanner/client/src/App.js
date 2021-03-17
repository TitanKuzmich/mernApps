import React from 'react'
import {useSelector} from "react-redux";

import Generate from "./components/Form/Generate";
import Load from "./components/Form/Load";
import Choose from "./components/Form/Choose";
import SourceTable from "./components/SourceTable";
import AlgoTable from "./components/AlgoTable";

import style from "./style.module.scss";

function App() {

    const fifoData = useSelector(({changeData})=> changeData.fifoData);
    const strfData = useSelector(({changeData})=> changeData.strfData);

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

            <AlgoTable name={"Алгоритм FIFO"} dataToRender={fifoData}/>
            <AlgoTable name={"Алгоритм STRF"} dataToRender={strfData}/>
        </div>
    );
}

export default App;
