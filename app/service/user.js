'use strict'

const Service = require('egg').Service

class UserService extends Service {
  /**
   * 创建用户
   * @param {*} payload
   */
  async create(payload) {
    // 密码加密
    payload.password = await this.ctx.genHash(payload.password)
    
    // 插入数据
    return this.ctx.model.User.create(payload)
  }
  
  /**
   * 查询用户
   * @param {*} id
   */
  async find(id) {
    return this.ctx.model.User.findById(id)
  }
  
  /**
   * 删除用户
   * @param {*} _id
   */
  async destroy(_id) {
    const user = this.find(_id)
    
    if (!user) {
      this.ctx.throw(404, 'user not find!')
    }
    
    return this.ctx.model.User.findByIdAndRemove(_id)
  }
  
  /**
   * 修改用户
   * @param {*} _id
   * @param {*} payload
   */
  async update(_id, payload) {
  
  }
}

module.exports = UserService
