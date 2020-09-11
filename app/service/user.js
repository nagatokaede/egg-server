'use strict'

const { Service } = require('egg')

class UserService extends Service {
  /**
   * 创建用户
   * @param {object} payload
   */
  async create(payload) {
    // 密码加密
    payload.password = await this.ctx.genHash(payload.password)

    // 插入数据
    return this.ctx.model.User.create(payload)
  }

  /**
   * 查询用户
   * @param {string} id
   */
  async find(id) {
    return this.ctx.model.User.findById(id)
  }

  /**
   * 查询单个用户
   * @param {string} _id
   */
  async findOne(_id) {
    const user = await this.find(_id)

    if (!user) {
      this.ctx.throw(404, 'user not find!')
    }

    return this.ctx.model.User.findById(_id).populate('role')
  }

  /**
   * 通过用户名查询用户
   * @param {string} username
   */
  async findByUserName(username) {
    return this.ctx.model.User.findOne({ username })
  }

  /**
   * 删除用户
   * @param {string} _id
   */
  async destroy(_id) {
    const user = await this.find(_id)

    if (!user) {
      this.ctx.throw(404, 'user not find!')
    }

    return this.ctx.model.User.findByIdAndRemove(_id)
  }

  /**
   * 修改用户
   * @param {string} _id
   * @param {object} payload
   */
  async update(_id, payload) {
    const user = await this.find(_id);

    if (!user) {
      this.ctx.throw(404, 'user not find!')
    }

    return this.ctx.model.User.findByIdAndUpdate(_id, payload)
  }

  /**
   * 分页查询用户
   * @param {object} payload
   */
  async index(payload = {}) {
    const { currentPage, pageSize, isPaging, search } = payload
    let res = []
    let count = 0
    const skip = (Number(currentPage) - 1) * Number(pageSize || 10)
    if (isPaging) {
      if (search) {
        res = await this.ctx.model.User.find({ mobile: { $regex: search } })
          .populate('role')
          .skip(skip)
          .limit(Number(pageSize))
          .sort({ createdAt: -1 })
          .exec()
        count = res.length
      } else {
        res = await this.ctx.model.User.find({})
          .populate('role')
          .skip(skip)
          .limit(Number(pageSize))
          .sort({ createdAt: -1 })
          .exec()
        count = await this.ctx.model.User.count({}).exec()
      }
    } else {
      if (search) {
        res = await this.ctx.model.User.find({ mobile: { $regex: search } })
          .populate('role')
          .sort({ createdAt: -1 })
          .exec()
        count = res.length
      } else {
        res = await this.ctx.model.User.find({})
          .populate('role')
          .sort({ createdAt: -1 })
          .exec()
        count = await this.ctx.model.User.count({}).exec()
      }
    }

    // 整理数据源 -> Ant Design Pro
    const pageData = res.map((e, i) => {
      const jsonObject = Object.assign({}, e._doc)
      jsonObject.key = i
      jsonObject.password = 'Are you ok?'
      jsonObject.createdAt = this.ctx.helper.formatTime(e.createdAt)
      return jsonObject
    })

    return { count, pageData, pageSize: Number(pageSize), currentPage: Number(currentPage) }
  }
}

module.exports = UserService
