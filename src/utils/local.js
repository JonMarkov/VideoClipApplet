const local = {}
/**
 * put 把数据放到本地存储
 * @param {*} key
 * @param {*} value
 */
local.set = function (key, value) {
  wx.setStorage({
    key: key,
    data: value,
    success: function (res) {
    }
  })
}

/**
 * get 获取本地存储数据
 * @param {*} key
 */
local.get = function (key) {
  let resData = wx.getStorageSync(key)
  return resData
}

/**
 * remove 清除本地数据
 * @param {*} key
 */
local.remove = function (key) {

}

export default local
