import React from 'react'
import FormHandler from '@muporash/react-formhandler'

const countries = ['x', 'y', 'z']

const initialValues = {
  firstname: 'default value',
  lastname: 'default value',
  country: 'y'
}

const userSchema = joi => ({
  firstname: joi.string().min(2).required(),
  lastname: joi.string().min(2).required(),
  country: joi.string().valid(countries).required()
})

const onSubmit = (values) => {
  console.log('Success', values)
}

const MyError = ({ error }) => {
  if (error === '') {
    return null
  } else {
    return (
      <p>
       {error} 
      </p>
    )
  }
}

function MyClass() {
  return (
    <FormHandler
      initialValues={initialValues}
      validationSchema={userSchema}
      onSubmit={onSubmit}
    >
      {({ values, errors, handleChange, handleOnBlur, handleSubmit, handleReset }) => {
        return (
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              name='firstname'
              onChange={handleChange}
              onBlur={handleOnBlur}
              value={values.firstname}
            />
            <MyError error={errors.firstname} />

            <input
              type='text'
              name='lastname'
              onChange={handleChange}
              onBlur={handleOnBlur}
              value={values.lastname}
            />
            <MyError error={errors.lastname} />

            <select
              name="country"
              onChange={handleChange}
              onBlur={handleOnBlur}
              defaultValue={values.country}
              >
              {countries.map((c, key) => (
                <option value={c} key={key}>
                  {c}
                </option>
              ))}
            </select>
            <MyError error={errors.country} />

            <button
              type='button'
              onClick={handleReset}>
              reset
            </button>
            <button type='submit'>
              submit
            </button>
          </form>
        )
      }}
    </FormHandler>
  )
}

export default MyClass
