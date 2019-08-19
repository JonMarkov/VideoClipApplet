// 请求的封装
const host = 'https://svideo-api.kankan.com'
export {
  host
}

// 请求封装
function request (url, method, data, header = {}) {
  wx.showLoading({
    title: '加载中' // 数据请求前loading
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: host + url,
      method: method,
      data: data,
      header: header,
      success: function (res) {
        wx.hideLoading()
        resolve(res.data)
      },
      fail: function (err) {
        wx.hideLoading()
        reject(err, false)
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  })
}

export function get (url, data, header = {}) {
  return request(url, 'GET', data, header)
}

export function post (url, data, header = {}) {
  return request(url, 'POST', data, header)
}
