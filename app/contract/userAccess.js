'use strict'

module.exports = {
  loginRequest: {
    username: {
      type: 'string',
      required: true,
      description: '用户名',
      example: 'nagato'
    },
    password: {
      type: 'string',
      required: true,
      description: '密码',
      example: '123456'
    }
  }
}
