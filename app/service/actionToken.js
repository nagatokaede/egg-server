'use strict'

const { Service } = require('egg')

class ActionToken extends Service {
  /**
   * 签署 token
   * @param {string} _id
   * @returns {Promise<string>}
   */
  async apply(_id) {
    const { ctx } = this

    return ctx.app.jwt.sign({
      data: { _id },
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7)
    }, ctx.app.config.jwt.secret)
  }
}

module.exports = ActionToken
