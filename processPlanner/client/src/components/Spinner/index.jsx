import React from "react"
import classNames from "classnames"

import style from "./style.m.scss"

const Spinner = ({ isLoading, green, big, className }) => {
  if (!isLoading) {
    return null
  }

  return (
    <svg
      viewBox="0 0 50 50"
      className={classNames(style.svgLoader, className, { [style.green]: green, [style.big]: big })}
    >
      <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="4" />
    </svg>
  )
}

export default Spinner
