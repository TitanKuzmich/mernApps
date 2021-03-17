import React from 'react';

const Header = (props) => {
    return (
        <div className="header">
            <div className="header-title">
                Вы можете смоделировать и сравнить алгоритмы планирования процессов (FIFO и STRF)
            </div>

            <div className="process-wrapper">
                <div className="process-block">
                    <div className="header-text">сгенерировав тестовые значения</div>
                    <div className="data-enter-wrapper">
                        <div className="input-wrapper">
                            <input type="text"
                                   className="generate-area"
                                   placeholder="Количество процессов"
                                   pattern="[1-9]"
                            />
                        </div>
                        <div className="btn btn-generate">Сгенерировать</div>
                    </div>
                </div>

                <div className="header-text">или</div>

                <div className="process-block">
                    <div className="header-text">загрузив свои исходные данные</div>
                    <div className="data-enter-wrapper">
                        <div className="input-wrapper">
                            <label className="label">
                                <i className="material-icons">attach_file</i>
                                <span className="title" id="upload_text">Добавить файл</span>
                                <input className="upload-area"
                                       id="upload_input"
                                       type="file"
                                       accept=".doc, .docx, .txt"/>
                            </label>
                        </div>
                        <div className="btn btn-upload">Загрузить</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;