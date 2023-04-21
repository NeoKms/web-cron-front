import config from '~/config/config'

export const errRequestHandler = (err: any): boolean|string => {
  if (!config.PRODUCTION) {
    console.error(err)
  }
  if (Object.prototype.hasOwnProperty.call(err, 'response') && err.response) {
    if ([400, 404].includes(err.response?.status)) {
      return err.message
    }
  } else {
    return err.message
  }
  return false
}
