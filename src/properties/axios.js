// 引用axios
import axios from 'axios';
import store from '@/store'
console.log(store)
// 自定义判断元素类型JS
function toType (obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterNull (o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}
 
 
function apiAxios (method, url, params, success, failure) {
  if (params) {
    params = filterNull(params)
  }
  store.commit('changeLoading', true);
  axios({
    method: method,
    url: url,
    data: (method === 'POST'||method === 'PUT'||method === 'DELETE')? params : null,
    params: method === 'GET'  ? params : null,
    // headers:{'Access-Control-Allow-Origin':'*'},
    withCredentials: true
  })
  .then(function (res) {
    console.log(res);
    store.commit('changeLoading', false);
    if (res.data.code == 0) {
      if (success) {
        success(res)
      }
    } else {
      if (failure) {
        failure(res)
      } else {
        window.alert(res.code+":"+res.msg)
      }
    }
  })
  .catch(function (err) {
    store.commit('changeLoading', false);
    if (err) {
      window.alert(err)
      return
    }
  })
}
 
// 返回在vue模板中的调用接口
export default {
  get: function (url, params, success, failure) {
    return apiAxios('GET', url, params, success, failure)
  },
  post: function (url, params, success, failure) {
    return apiAxios('POST', url, params, success, failure)
  },
  put: function (url, params, success, failure) {
    return apiAxios('PUT', url, params, success, failure)
  },
  delete: function (url, params, success, failure) {
    return apiAxios('DELETE', url, params, success, failure)
  }
 
}
