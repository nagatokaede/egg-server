'use strict'

const fs = require('fs')
const path = require('path')
const { Controller } = require('egg')
const awaitWriteStream = require('await-stream-ready').write
const sendToWormhole = require('stream-wormhole')
/**
 * @Controller 文件服务
 */

class UploadController extends Controller {
  /**
   * @summary 上传单个文件
   * @description 上传单个文件
   * @router post /api/upload/single
   * @request header string *Authorization Bearer token
   * @request query string customFolder eg:default 自定义文件夹
   * @request formData file file 上传文件
   * @response 200 baseResponse 上传成功
   */
  async singleUpload() {
    const { ctx } = this

    // 要通过 ctx.getFileStream 便捷的获取到用户上传的文件，需要满足两个条件：
    // 只支持上传一个文件。
    // 上传文件必须在所有其他的 fields 后面，否则在拿到文件流时可能还获取不到 fields。
    const stream = await ctx.getFileStream()

    // 所有表单字段都能通过 `stream.fields` 获取到
    const extname = path.extname(stream.filename)
    const filename = path.basename(stream.filename, extname)
    const uuid = Date.now().toString()

    // 自定义文件夹
    const customFolder = ctx.query.customFolder || 'default'

    // 创建目录
    ctx.helper.mkdir(path.join(__dirname, '../public/uploads', customFolder))

    // 组装参数 stream
    const target = path.join(__dirname, '../public/uploads', customFolder, `${uuid}-${filename}${extname.toLowerCase()}`)
    const writeStream = fs.createWriteStream(target)

    // 文件处理，上传到云存储等
    try {
      await awaitWriteStream(stream.pipe(writeStream))
    } catch (err) {
      // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
      await sendToWormhole(stream)
      throw err
    }

    // 调用 Service 进行业务处理
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx })
  }
}

module.exports = UploadController
