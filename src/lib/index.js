import React, { Fragment, Component } from 'react'
import Joi, { cl, resetObjKeyValue, validateAll } from './helpers.js'

class FormHandler extends Component {
  state = {
    values: {},
    errors: {},
    valuesOnBlur: {},
    validationSchema: {}
  }

  constructor(props) {
    super(props)
    this.state.values = {...props.initialValues}
    this.state.errors = resetObjKeyValue({...props.initialValues})
    this.state.valuesOnBlur = resetObjKeyValue({...props.initialValues})
    this.state.validationSchema = props.validationSchema(Joi)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleOnBlur = this.handleOnBlur.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.validate = this.validate.bind(this)
  }

  handleOnBlur({ target: { name, value }}) {
    if (!this.state.valuesOnBlur[name]) {
      const tmpState = this.state
      tmpState.valuesOnBlur[name] = true
      this.setState(tmpState)
    }

    this.validate(false)
  }

  handleChange({ target: { name, value }}) {
    const tmpState = this.state
    tmpState.values[name] = value
    this.setState(tmpState)
  }

  handleReset() {
    this.setState({
      valuesOnBlur: resetObjKeyValue(this.state.valuesOnBlur),
      values: resetObjKeyValue(this.state.values)
    })
  }

  async handleSubmit(e) {
    e.preventDefault()
    const isSuccess = await this.validate(true)
    if (isSuccess) {
      this.props.onSubmit(this.state.values)
    }
  }

  async validate(checkAllField = false) {
    let { validationSchema, valuesOnBlur, values } = this.state
    let isSuccess = false

    // 0
    if (checkAllField) {
      await this.setState({
        valuesOnBlur: resetObjKeyValue({...this.state.valuesOnBlur}, true)
      })
      valuesOnBlur = this.state.valuesOnBlur
    }

    // 1
    const getSchema = (Object
      .keys(validationSchema)
      .filter(key => valuesOnBlur[key])
      .reduce((res, key) => ({...res, [key]: validationSchema[key]}), {}))

    // 2.
    const errors = await validateAll(getSchema, values)

    // 3.
    let tmpErrors = null
    if (errors) {
      tmpErrors = {...this.state.errors}

      for (let key in tmpErrors) {
        const err = errors.find(i => i.key === key)
        tmpErrors[key] = err ? err.message : ''
      }
    } else {
      isSuccess = true
      // Reset Errors.
      tmpErrors = resetObjKeyValue({...this.state.errors})
    }

    this.setState({
      errors: tmpErrors
    })
    return isSuccess
  }

  render() {
    const objChildren = {
      values: this.state.values,
      errors: this.state.errors,
      handleChange: this.handleChange,
      handleOnBlur: this.handleOnBlur,
      handleSubmit: this.handleSubmit,
      handleReset: this.handleReset,
    }

    return this.props.children(objChildren)
  }
}

export default FormHandler
