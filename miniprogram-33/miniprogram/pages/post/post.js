//post.js

const app = getApp()
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onSubmit(event) {
    const { title, content } = event.detail.value
    if (!title || !content) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none',
        duration: 1500
      })
      return
    }
    wx.showLoading({
      title: '正在提交',
    })
    db.collection('posts').add({
      data: {
        title,
        content,
        likes: 0,
        createTime: new Date(),
        updateTime: new Date()
      }
    }).then(res => {
      console.log(res)
      wx.hideLoading()
      wx.showToast({
        title: '提交成功',
        icon: 'success',
        duration: 1500
      })
      wx.navigateBack()
    }).catch(err => {
      console.error(err)
      wx.hideLoading()
      wx.showToast({
        title: '提交失败',
        icon: 'none',
        duration: 1500
      })
    })
  }

})
