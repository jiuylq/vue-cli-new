import axios from 'axios'
import store from '@/store'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})
console.log(process.env)

// 重复请求限制，目前统一所有接口统一时间段内当前一个没收到请求返回都不会继续触发之后的请求
const ajaxPending = new Map() // 存储每个ajax请求的队列
const cancelToken = Axios.CancelToken // 初始化取消请求的构造函数

const removePending = (config) => {
  console.log(ajaxPending.keys())
  const cancel_key = getCancelKey(config)
  // 当前请求存在队列中，取消第二次请求
  if (ajaxPending.has(cancel_key)) {
    const cancel = ajaxPending.get(cancel_key)
    cancel('Request canceled');
    ajaxPending.delete(cancel_key);
  }
}
/**
 * @description 添加请求队列
 * @param {Object} config
 * @param {function} cancel
 */
const addPending = (config) => {
  const cancel_key = getCancelKey(config)
  config.cancelToken = config.cancelToken || new cancelToken(cancel => {
    if(!ajaxPending.has(cancel_key)) {
      ajaxPending.set(cancel_key, cancel)
    }
  })
}
/**
 * @description 生成队列唯一key
 * @param {Object} config
 * @returns
 */
const getCancelKey = (config) => {
  return `${config.method}:${config.url}`
}
// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    removePending(config);
    addPending(config);
    if (store.getters.token) {
      // please modify it according to the actual situation
      config.headers.Authorization = 'JWT' + store.getters.token
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    removePending(res.config)
    // do something with response success
    // 与后端约定一套返回格式，自定义code状态码
    const res = response.data
    // switch (res.code) {
    //   case 1:
    //     break
    //   case 2: //
    //     break
    //   case 3: //
    //     break
    //   case 4: //
    //     break
    //   // ...忽略
    //   default:
    // }
    return res
  },
  error => {
    const config = err.config || {};
    removePending(config)
    console.log('err' + error) // for debug
    // error
    // do some with response error
    if (error.response !== undefined) {
      switch (error.response.status) {
        case 400:
          break
        case 401: // 会话已失效! 请重新登录
          break
        case 402: // 登陆超时 ！
          break
        case 403: // 没有权限！
          break
        // ...忽略
        default:
      }
    }
    return Promise.reject(error)
  }
)

export default {
  request: service,
  // 以下封装了一些常用的请求
  // get请求加上时间戳参数，避免从缓存中拿数据
  get (url, param) {
    if (param !== undefined) {
      Object.assign(param, { _t: (new Date()).getTime() })
    } else {
      param = { _t: (new Date()).getTime() }
    }
    return service({ method: 'get', url, params: param })
  },
  getData (url, param) {
    return service({ method: 'get', url, params: param })
  },
  post (url, param, config) {
    return service.post(url, param, config)
  },
  put: service.put,
  _delete: service.delete
}
