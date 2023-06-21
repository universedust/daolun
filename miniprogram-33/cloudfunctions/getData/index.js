// index.js
const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database()
const collection = db.collection('data')

exports.main = async (event, context) => {
  const res = await collection.orderBy('timestamp', 'desc').limit(1).get()
  return {
    data: res.data[0]
  }
}
