export const convertModelToFormData = (val: any, formData: FormData = new FormData(), namespace: string = ''): FormData => {
  if ((typeof val !== 'undefined') && (val !== null)) {
    if (val instanceof Date) {
      formData.append(namespace, val.toISOString())
    } else if (val instanceof Array) {
      // eslint-disable-next-line no-restricted-syntax
      for (const element of val) {
        convertModelToFormData(element, formData, `${namespace}[]`)
      }
    } else if (typeof val === 'object' && !(val instanceof File)) {
      // eslint-disable-next-line no-restricted-syntax
      for (const propertyName in val) {
        if (Object.prototype.hasOwnProperty.call(val, propertyName)) {
          convertModelToFormData(val[propertyName], formData, namespace ? `${namespace}[${propertyName}]` : propertyName)
        }
      }
    } else {
      formData.append(namespace, val)
    }
  }

  return formData
}
