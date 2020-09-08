'use strict'

module.exports = {
  createUserRequest: {
    username: {
      type: 'string',
      required: true,
      description: '用户名',
      example: 'nagato',
    },
    mobile: {
      type: 'string',
      required: true,
      description: '手机号',
      example: '18101652067',
      format: /^1[34578]\d{9}$/
    },
    password: {
      type: 'string',
      required: true,
      description: '密码',
      example: '123456',
    },
    nickName: {
      type: 'string',
      required: true,
      description: '昵称',
      example: '長門楓',
    }
  }
}
