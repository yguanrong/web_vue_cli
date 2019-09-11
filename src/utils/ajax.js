function interceptor (Axios) {
  Axios.interceptors.request.use(function (request) {
      const url = request.url
      // request.url = "/apis" + url
      // 添加token
      // request.headers.common.Authorization = localStorage.token;
      let r = new Date().getTime()
      if (request.url.indexOf('?') != -1) {
        request.url += '&r=' + r
      } else {
        request.url += '?r=' + r
      }
      request.headers.ZnvToken = '678C7B996793BA023649F822DB1DA2AD'; // 标识自家系统调用后端接口
      return request
    }, function (error) {
      // 对响应错误做处理
      return Promise.reject(error)
    }
  )
  Axios.interceptors.response.use(function (response) {
    if (response.status === 401) {
      // sessionStorage.clear();
      // window.location.href = '/'
    }
    // 对响应数据做处理
    return response
  }, function (error) {
    // 对响应错误做处理
    if (error.response && error.response.status === 401) {
      // sessionStorage.clear();
      // window.location.href = '/'
    }
    console.error(error)
    return Promise.reject(error)
  })
  Axios.interceptors.request.use(function (config) {
    // 在发起请求请做一些业务处理
    return config
  }, function (error) {
    // 对请求失败做处理
    console.error(error)
    return Promise.reject(error)
  })
}

export { interceptor }
