import Joi from 'joi'

export const validateAll = async (schema, payload = {}) => {
  // 1.
  const errToArray = errors => errors.map(item => ({
    key: item.context.key,
    message: item.message
  }))

  const optionsJoi = {
    abortEarly: false
  }
  // 2.
  const validation = (await Joi
    .validate(
      payload,
      Joi.object({...schema}).unknown(),
      optionsJoi
    )
    .then(() => null)
    .catch(({ name, details }) => {
      return errToArray(details)
    })
  )

  // 3.
  return validation
}

export function resetObjKeyValue(obj, nextValue = '') {
  for (let key in obj) {
    if (typeof obj[key] === 'object') {
      obj[key] = resetObjKeyValue(obj[key])
    } else {
      obj[key] = nextValue
    }
  }
  return obj
}

export const cl = (...v) => console.log(Date.now(), ...v)

export default Joi
