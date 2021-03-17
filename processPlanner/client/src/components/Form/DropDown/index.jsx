import React, { useState, useRef, useEffect, useLayoutEffect } from "react"
import classNames from "classnames"
import { handleInputValidation } from "../../../utils/validators"

import Spinner from "../../Spinner"

import style from "./style.module.scss"

const getListRef = (options) =>
  options.reduce((acc, option) => {
    if ("value" in option) {
      acc[option.value] = React.createRef()
    }
    return acc
  }, {})

const DropDown = (props) => {
  const {
    value,
    selected,
    options,
    placeholder,
    firstOptionPlaceholder,
    isLoading,
    iconName,
    onFocusChange,
    onScrollBottom,
    clearIcon = false,
    dropDownButton = true,
    error,
    readOnly,
    pattern,
    noWrap,
    disabled,
    viewRow = 6
  } = props

  const [isMenuOpen, setMenuOpen] = useState(false)
  const [focusedItem, setFocusedItem] = useState(-1)
  const [itemsRefs, setItemsRefs] = useState(getListRef(props.options))
  const [menuHeight, setMenuHeight] = useState(-1)

  const isReadonly = readOnly || !("onChange" in props)
  const focusedItemRef = React.useRef(focusedItem)
  const ref = useRef(null)
  const inputRef = useRef(null)
  const listRef = useRef(null)

  const isMenuAlignBottom = () => {
    if (listRef.current && inputRef.current) {
      const inputPosition = inputRef.current.getBoundingClientRect()
      const listPosition = listRef.current.getBoundingClientRect()

      const canTopAlign = inputPosition.top -  listPosition.height
      const canBottomAlign = listPosition.height <= document.documentElement.clientHeight - inputPosition.bottom

      if (!canBottomAlign && canTopAlign) {
        return false
      }
    }

    return true
  }

  const getMenuMaxHeight = () => {
    if (options.length <= viewRow || !itemsRefs) {
      return setMenuHeight(0)
    }

    const menuBottomOffset = 13
    const height = options
      .slice(0, viewRow)
      .reduce(
        (acc, option) =>
          itemsRefs[option.value] && itemsRefs[option.value].current
            ? acc + itemsRefs[option.value].current.clientHeight
            : acc,
        0
      )

    return setMenuHeight(height + menuBottomOffset)
  }

  const getDropdownListStyles = () => {
    if (!isMenuAlignBottom()) {
      const bottom = ref.current && ref.current?.clientHeight + 5
      return { bottom: `${bottom}px` }
    }
    return {}
  }

  const setFocused = (focused) => {
    focusedItemRef.current = focused
    setFocusedItem(focused)
  }

  const onSelect = (option) => {
    if (option.disabled) {
      return
    }

    setFocused(-1)
    setMenuOpen(false)

    if (props.onSelect) {
      props.onSelect(option)
    }
  }

  const onKeyDown = (e) => {
    if (!isMenuOpen) {
      return false
    }

    const focusedIndex = focusedItemRef.current

    if (e.key === "Escape") {
      setMenuOpen(false)
      return true
    }

    if (e.key === "ArrowDown") {
      setFocused(focusedIndex < options.length - 1 ? focusedIndex + 1 : 0)
      return true
    }

    if (e.key === "ArrowUp") {
      setFocused(focusedIndex > 0 ? focusedIndex - 1 : options.length - 1)
      return true
    }

    if (e.key === "Enter" && focusedIndex !== -1) {
      const option = options[focusedIndex]
      onSelect(option)
    }
    if (e.key === "Enter") {
      setMenuOpen(false)
    }

    return true
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !(ref.current).contains(event.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [ref])

  useEffect(() => {
    setItemsRefs(getListRef(options))

    if (isMenuOpen) {
      window.addEventListener("keydown", onKeyDown)
    }

    return () => {
      setFocused(-1)
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [isMenuOpen, options])

  useEffect(() => {
    if (isMenuOpen && (value || selected)) {
      if (value) {
        itemsRefs[value]?.current.scrollIntoView({
          block: "nearest"
        })
      }

      if (selected?.value) {
        itemsRefs[selected.value]?.current.scrollIntoView({
          block: "nearest"
        })
      }
    }
  }, [itemsRefs])

  useEffect(() => {
    const option = options[focusedItem]

    if (option && option.value) {
      itemsRefs[option.value]?.current.scrollIntoView({
        block: "nearest"
      })
    }
  }, [focusedItem])

  useLayoutEffect(() => {
    if (!itemsRefs) {
      getMenuMaxHeight()
    }
  }, [itemsRefs])

  const onChange = (e) => {
    setFocused(-1)

    if (handleInputValidation(e.target.value, pattern) && props.onChange) props.onChange(e.target.value)
  }

  const onInputKeyDown = (e) => {
    if (isMenuOpen && (e.key === "ArrowUp" || e.key === "ArrowDown")) {
      e.preventDefault()
    }
    if (e.key === "Tab") {
      setMenuOpen(false)
    }
  }
  const onFocus = () => {
    setMenuOpen(true)
    if (onFocusChange) {
      onFocusChange(true)
    }
  }

  const onBlur = () => {
    if (onFocusChange) {
      onFocusChange(false)
    }
  }

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen)
  }

  const handleScroll = (e) => {
    const target = e.target
    const bottom = target.scrollHeight - target.scrollTop === target.clientHeight
    if (bottom && onScrollBottom) {
      onScrollBottom()
    }
  }

  const getValue = () => {
    if (selected) {
      return selected.label
    }

    return value || ""
  }

  const renderRow = (option) => {
    return noWrap ? (
      <div className={style.nowrap}>{option.label || option.value}</div>
    ) : (
      <>{option.label || option.value}</>
    )
  }

  return (
    <div className={classNames(style.dropDownWrapper, props.className)} ref={ref}>
      <div
        className={classNames("dropdownMenu", style.dropDownMenu, {
          [style.disabled]: disabled,
          [style.dropDownMenuReadonly]: isReadonly,
          [style.error]: error,
          [style.dropDownWithIcon]: iconName,
          [style.dropDownWithOptionsIcon]: selected && selected.icon
        })}
      >
        <input
          value={getValue()}
          placeholder={placeholder}
          onChange={onChange}
          onKeyDown={onInputKeyDown}
          className={classNames(style.input, {
            [style.readOnly]: isReadonly,
            [style.placeholder]: firstOptionPlaceholder && selected?.value === options[0]?.value
          })}
          onFocus={onFocus}
          onBlur={onBlur}
          onClick={() => setMenuOpen(true)}
          ref={inputRef}
          readOnly={isReadonly}
          disabled={disabled}
        />

        {isLoading ? (
          <button type="button" className={classNames(style.controlButton, style.spinner)}>
            <Spinner isLoading />
          </button>
        ) : (
          <>
            {((dropDownButton && !clearIcon) || (dropDownButton && clearIcon && !value)) && (
              <button type="button" className={style.controlButton} onClick={toggleMenu}>
                {isMenuOpen && options.length ? (
                    <div className={style.controlIcon}>
                      <svg width="8" height="4" viewBox="0 0 8 4" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M8 0L4 4L0 0L8 0Z"/>
                      </svg>

                    </div>
                ) : (
                  <div className={classNames(style.controlIcon, style.controlClosed)}>
                    <svg width="8" height="4" viewBox="0 0 8 4" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M8 0L4 4L0 0L8 0Z"/>
                    </svg>
                  </div>
                )}
              </button>
            )}
          </>
        )}
      </div>

      <div
        className={classNames(style.dropDownListWrapper, {
          [style.openMenu]: isMenuOpen && options.length > 0
        })}
        style={getDropdownListStyles()}
      >
        <ul
          className={style.dropDownList}
          style={menuHeight ? { height: menuHeight } : {}}
          ref={listRef}
          onScroll={handleScroll}
        >
          {options.map((option, index) => (
            <React.Fragment key={index.toString()}>
              {"value" in option && option.label !== "" && (
                <li ref={itemsRefs[option.value]}>
                  <div
                    className={classNames("menuItem", style.menuItem, {
                      selected:
                        option.value === value ||
                        index === focusedItem ||
                        (selected && selected.label === option.label),
                      disabled: option.disabled,
                      icon: option.icon
                    })}
                    onClick={() => onSelect(option)}
                  >
                    {option.icon && option.icon}
                    {option.component ? (
                      option.component
                    ) : (
                      <div className={classNames(style.row, { [style.contentWithIcon]: option.icon })}>
                        {renderRow(option)}
                      </div>
                    )}
                  </div>
                </li>
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default DropDown
