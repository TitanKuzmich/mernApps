import React from "react"
import classNames from "classnames"
import style from "./style.module.scss"

const Wrapper = ({ children, className }) => (
  <div className={classNames(style.modalSection, className)}>{children}</div>
)

const OptionWrapper = ({ columns = 2, className, children }) => (
  <div
    className={classNames(style.optionWrapper, className, {
      [style.threeColumns]: columns === 3
    })}
  >
    {children}
  </div>
)

const Label = ({
  text
}) => (
  <React.Fragment>
      {text && (
        <div className={classNames("label", style.modalSectionLabelWrapper)}>
          {text}
        </div>
      )}
  </React.Fragment>
)

const Content = ({ disabled, children }) => (
  <div className={classNames(style.modalSectionContainer, { [style.disabled]: disabled })}>{children}</div>
)

const ContentLabel = ({ children }) => (
  <div className={style.modalLabelContainer}>{children}</div>
)

const SubSection = {
  Wrapper,
  OptionWrapper,
  Label,
  Content,
  ContentLabel
}

export default SubSection
