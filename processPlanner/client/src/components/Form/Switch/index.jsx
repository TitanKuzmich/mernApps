import React from "react"
import classNames from "classnames"

import style from "./style.module.scss"

const Switch = ({ checked, disabled, onChange }) => {
  return (
    <label className={classNames(style.switchWrapper, { [style.disabled]: disabled })}>
      <input type="checkbox" onChange={onChange} className={style.input} disabled={disabled} />
      <span className={classNames(style.switchCircle, { [style.switchCircleChecked]: checked })} />
    </label>
  )
}

export default Switch
