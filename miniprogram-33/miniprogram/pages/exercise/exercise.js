// exercise.js
const app = getApp()

Page({
  data: {
    time: '',
    distance: ''
  },

  onLoad: function() {
    this.updateData()
  },

  updateData: function() {
    // 获取最新的数据
    wx.cloud.callFunction({
      name: 'getData',
      success: res => {
        console.log(res)
        const { data } = res.result
        const distance = data.distance.toFixed(2) // 保留两位小数
        const time = new Date(data.timestamp).toLocaleString() // 转换为本地时间格式
        this.setData({
          distance,
          time
        })
        setTimeout(() => {
          this.updateData() // 每隔一段时间更新一次数据
        }, 5000)
      },
      fail: err => {
        console.error(err)
      }
    })
  }
})
