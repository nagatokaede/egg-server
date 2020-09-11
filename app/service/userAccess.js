'use strict'

const { Service } = require('egg')

class UserAccessService extends Service {
  /**
   * 登录
   * @param {object} payload
   * @returns {Promise<{token: *}>}
   */
  async login(payload) {
    const { ctx, service } = this

    // 获取用户信息
    const user = await service.user.findByUserName(payload.username)
    if (!user) ctx.throw(404, 'user not found')

    // console.log(user)

    // 校验密码
    const verifyPsw = await ctx.compare(payload.password, user.password)
    if (!verifyPsw) ctx.throw(404, 'user password is error')

    //  ⽣成 Token 令牌
    return { token: await service.actionToken.apply(user._id) }
  }

  /**
   * 登出
   * @returns {Promise<void>}
   */
  async logout() {
    console.log('logout')
  }

  /**
   * 当前状态
   * @returns {Promise<void>}
   */
  async current() {
    const { ctx, service } = this

    // ctx.state.user 可以提取到 JWT 编码的 data
    const _id = ctx.state.user.data._id

    const user = await service.user.find(_id)
    if (!user) ctx.throw(404, 'user not found')

    user.password = 'How old are you?'
    return user
  }
}

module.exports = UserAccessService
