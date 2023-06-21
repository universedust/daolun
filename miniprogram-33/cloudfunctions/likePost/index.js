// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const { postId } = event
    const res = await db.collection('posts').doc(postId).update({
      data: {
        likes: db.command.inc(1)
      }
    })
    return res
  } catch (err) {
    console.log(err)
    return err
  }
}
