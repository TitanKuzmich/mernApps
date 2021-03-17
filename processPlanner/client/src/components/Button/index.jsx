import React from "react"
import cn from "classnames"
import Spinner from "../Spinner"

import style from "./style.module.scss"

const Button = props => {
  const {
    children,
    onClick,
    type,
    isLoading,
    rounded,
    disabled,
    inactive,
    link,
    small,
    tiny,
    big,
    secondary,
    expanded,
    cta,
    ghost,
    className
  } = props


  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        style.buttonWrapper,
        {
          [style.rounded]: rounded,
          [style.disabled]: disabled,
          [style.inactive]: inactive,
          [style.link]: link,
          [style.tiny]: tiny,
          [style.small]: small,
          [style.big]: big,
          [style.secondary]: secondary,
          [style.isLoading]: isLoading,
          [style.expanded]: expanded,
          [style.cta]: cta,
          [style.ghost]: ghost
        },
        className
      )}
    >
      {!isLoading ? (
        children
      ) : (
        <div className={style.loading}>
          <div className={style.spinnerWrapper}>
            <Spinner isLoading />
          </div>

          <div className={style.loadingText}>{children}</div>
        </div>
      )}
    </button>
  )
}

export default Button
