'use strict'

const { Controller } = require('egg')

/**
 * @Controller 用户管理
 */

class UserController extends Controller {
  /**
   * @summary 创建用户
   * @description 创建用户，记录用户账户/密码/类型
   * @router post /api/user
   * @request header string *Authorization Bearer token
   * @request body createUserRequest *body
   * @response 200 baseResponse 创建成功
   */
  async create() {
    const { ctx, service } = this

    // 参数校验
    ctx.validate(ctx.rule.createUserRequest)

    // 组装参数
    const payload = ctx.request.body || {}

    // 调⽤ Service 进⾏业务处理
    const res = await service.user.create(payload)

    ctx.helper.success({ ctx, res })
  }

  /**
   * @summary 删除单个用户
   * @description 删除单个用户
   * @router delete /api/user/{id}
   * @request header string *Authorization Bearer token
   * @request path string *id eg:1 用户ID
   * @response 200 baseResponse 删除成功
   */
  async destroy() {
    const { ctx, service } = this

    // 组装参数
    const { id } = ctx.params

    // 调用 Service 进行业务处理
    await service.user.destroy(id)

    ctx.helper.success({ ctx })
  }

  /**
   * @summary 修改用户
   * @description 修改用户
   * @router put /api/user/{id}
   * @request header string *Authorization Bearer token
   * @request path string *id eg:1 用户ID
   * @request body createUserRequest *body
   * @response 200 baseResponse 修改成功
   */
  async update() {
    const { ctx, service } = this

    // 校验参数
    ctx.validate(ctx.rule.createUserRequest)

    // 组装参数
    const { id } = ctx.params
    const payload = ctx.request.body || {}

    // 调用 Service 进行业务处理
    await service.user.update(id, payload)

    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx })
  }

  /**
   * @summary 查询单个用户
   * @description 查询单个用户
   * @router get /api/user/{id}
   * @request header string *Authorization Bearer token
   * @request path string *id eg:1 用户ID
   * @response 200 baseResponse 查询成功
   */
  async findOne() {
    const { ctx, service } = this

    // 组装参数
    const { id } = ctx.params

    // 调用 Service 进行业务处理
    const res = await service.user.findOne(id)

    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res })
  }

  /**
   * @summary 查询用户列表
   * @description 查询用户列表
   * @router get /api/user
   * @request query integer *currentPage eg:1 当前页
   * @request query integer *pageSize eg:10 单页数量
   * @request query string search eg: 搜索字符串
   * @request query boolean isPaging eg:true 是否需要翻页
   * @response 200 baseResponse 查询成功
   */
  async index() {
    const { ctx, service } = this

    // 组装参数
    const payload = ctx.query

    // 调用 Service 进行业务处理
    const res = await service.user.index(payload)

    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res })
  }
}

module.exports = UserController
