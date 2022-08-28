import store from '@/store'

function checkPermission(el, binding) {
  const { value } = binding
  const permissions = store.getters && store.getters.allPermissions

  if (value && value instanceof Array) {
    if (value.length > 0) {
      const permissionVals = value

      const hasPermission = permissions.some(role => {
        return permissionVals.includes(role)
      })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  } else {
    throw new Error(`need permission! Like v-permission="['xxx']"`)
  }
}

export default {
  inserted(el, binding) {
    checkPermission(el, binding)
  },
  update(el, binding) {
    checkPermission(el, binding)
  }
}
