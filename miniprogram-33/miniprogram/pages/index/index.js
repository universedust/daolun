const app = getApp()
const db = wx.cloud.database()

Page({
  data: {
    posts: []
  },

  onLoad: function () {
    this.getPosts()
  },

  // 获取所有帖子列表
  getPosts() {
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'getPosts'
    }).then(res => {
      console.log(res)
      wx.hideLoading()
      const { data } = res.result
      this.setData({
        posts: data.reverse()
      })
    }).catch(err => {
      console.error(err)
      wx.hideLoading()
    })
  },

  // 点赞
  likePost(event) {
    const postId = event.currentTarget.dataset.id
    wx.cloud.callFunction({
      name: 'likePost',
      data: {
        postId
      }
    }).then(res => {
      console.log(res)
      wx.showToast({
        title: '点赞成功',
        icon: 'success',
        duration: 1500
      })
      this.getPosts()
    }).catch(err => {
      console.error(err)
    })
  },

  // 跳转到发帖页面
  goToPostPage() {
    wx.navigateTo({
      url: '/pages/post/post',
    })
  }
})
