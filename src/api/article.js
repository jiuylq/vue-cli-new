import http from '@/utils/request'

export const A = (param) => { return http.get('/json.json', param) }

export default {
  B (param) { return http.post('/api/', param) },
  C (param) { return http.put('/api/', param) },
  D (param) { return http._delete('/api/', { data: param }) }
}
