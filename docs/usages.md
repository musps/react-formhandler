## Basic usage

```jsx
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
```

### initialValues: Object

* The default form data represented as object.

```jsx
  const initialValues = {
    firstname: 'default value',
    lastname: 'default value',
    country: 'y'
  }
```

### validationSchema: Function(joi: Joi): Object<Joi>

* A valid Joi validation schema.
* For more specification: [https://github.com/hapijs/joi](https://github.com/hapijs/joi)

```jsx
  const userSchema = joi => ({
    firstname: joi.string().min(2).required(),
    lastname: joi.string().min(2).required(),
    country: joi.string().valid(countries).required()
  })
```

### onSubmit(err: Boolean, values: Object<initialValues>)

| variable | description
| --- | ---
| err | Is set to true or false whenever the form validation succeed or not
| values | Return the initialValues Object passed as first arguments.

```jsx
  const onSubmit = (err, values) => {
    if (err) {
      console.log('onSubmit error')
    } else {
      console.log('Success', values)
    }
  }
```