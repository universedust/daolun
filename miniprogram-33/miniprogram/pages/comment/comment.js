//comment.js

const app = getApp()
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    postId: '',
    postDetail: {}
  },

  onLoad: function (options) {
    console.log(options)
    this.setData({
      postId: options.postId
    })
    this.getPostDetail()
  },

  // 获取帖子详情
  getPostDetail() {
    db.collection('posts').doc(this.data.postId).get().then(res => {
      console.log(res)
      this.setData({
        postDetail: res.data
      })
    }).catch(err => {
      console.error(err)
    })
  },

  onSubmit(event) {
    const { content } = event.detail.value
    if (!content) {
      wx.showToast({
        title: '请填写评论内容',
        icon: 'none',
        duration: 1500
      })
      return
    }
    wx.showLoading({
      title: '正在提交',
    })
    db.collection('comments').add({
      data: {
        postId: this.data.postId,
        content,
        createTime: new Date()
      }
    }).then(res => {
      console.log(res)
      wx.hideLoading()
      wx.showToast({
        title: '提交成功',
        icon: 'success',
        duration: 1500
      })
      this.getPostDetail()
    }).catch(err => {
      console.error(err)
      wx.hideLoading()
      wx.showToast({
        title: '提交失败',
        icon: 'none'
      })
    })
  }

})
