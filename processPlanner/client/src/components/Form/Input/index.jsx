import React, { useState, useRef, useEffect } from "react"
import classNames from "classnames"
import InputMask from "react-input-mask"
import { handleInputValidation } from "../../../utils/validators"

// import Icon from "@components/Icon"
// import InputMessage from "@components/Form/InputMessage"

import style from "./style.module.scss"

const Input = ((props) => {
  const {
    label,
    className,
    placeholder,
    notice,
    error,
    onFocus,
    onBlur,
    onChange,
    pattern,
    messagePosition,
    autoComplete,
    icon,
    tooltip,
    disabled,
    classIcon,
    mask,
    maskChar,
    formatChars,
    ...rest
  } = props

  const componentRef = useRef(null)
  delete rest.value

  const [isFocused, setFocus] = useState(false)
  const [value, setValue] = useState(props.value)
  const isMessagesInline = messagePosition === "left"
  const inputPlaceholder = !label || (label && isFocused) || (label && placeholder) ? placeholder : ""
  const onFocusHandle = (e) => {
    setFocus(true)
    if (onFocus) {
      onFocus(e)
    }
  }
  const onBlurHandle = (e) => {
    setFocus(false)
    if (onBlur) {
      onBlur(e)
    }
  }

  const onChangeHandle = (e) => {
    if (handleInputValidation(e.target.value, pattern)) {
      setValue(e.target.value)
      if (onChange) {
        onChange(e)
      }
    }
  }

  useEffect(() => {
    if (value !== props.value) {
      setValue(props.value)
    }
  }, [props.value])

  return (
    <div className={classNames(className, style.inputWrapper, { [style.inputWrapperNoticesInline]: isMessagesInline })}>
      {/*{messagePosition === "left" && <InputMessage error={error} notice={notice} inline />}*/}
      <div
        className={classNames(style.inputComponent, {
          [style.inputComponentError]: error,
          [style.disabled]: disabled,
          [style.withIcon]: icon
        })}
      >
        {/*{icon && <Icon name={icon} classIcon={classNames(style.customIcon, classIcon)} />}*/}
        <InputMask
          className={classNames(style.input, { [style.withTooltip]: tooltip })}
          inputRef={componentRef}
          value={value || ""}
          placeholder={inputPlaceholder}
          onFocus={onFocusHandle}
          onBlur={onBlurHandle}
          onChange={onChangeHandle}
          disabled={disabled}
          mask={mask}
          formatChars={formatChars}
          maskChar={maskChar}
          autoComplete={autoComplete}
          {...rest}
        />

        {((label && !placeholder) || (label && placeholder && value)) && (
          <div className={style.placeholderWrapper}>
            <div
              className={classNames(style.placeholderContainer, {
                [style.placeholderContainerFocused]: isFocused || value
              })}
            >
              {label}
            </div>
          </div>
        )}
      </div>

      {/*{(!messagePosition || messagePosition === "bottom") && <InputMessage error={error} notice={notice} />}*/}
    </div>
  )
})
export default Input
