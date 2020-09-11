'use strict'

const moment = require('moment')

// 处理成功响应
exports.success = ({ ctx, res = null, msg = '处理成功' }) => {
  ctx.body = {
    code: 0,
    data: res,
    msg
  }

  ctx.status = 200
}

// 格式化时间
exports.formatTime = (time, format = 'YYYY-MM-DD HH:mm:ss') => moment(time).format(format)

const fs = require('fs');
const path = require('path');
/**
 * 检测目录或文件
 * @param {string} dirname - 目录或文件的路径
 */
const accessSync = dirname => fs.accessSync(dirname, fs.constants.F_OK);

/**
 * 创建目录
 * @param {string} dirname - 目录
 */
const mkdirSync = dirname => fs.mkdirSync(dirname);
/**
 * 尾递归创建文件夹
 * @param {string} dirname - 文件目录
 * @param {number} pointer - 目录指针，表示当前处理哪一层
 * @param {number} direction - 目录递归方向 1 下潜 0 上浮
 */
const mkdir = (dirname, pointer = dirname.split(path.sep).length, direction = 1) => {
  if (direction) { // 正向 判断目录边界
    try {
      // 判断
      accessSync(path.join(...dirname.split(path.sep).slice(0, pointer)));
      // 完成
      if (pointer === dirname.split(path.sep).length) return 0;
      // 反向
      return mkdir(dirname, ++pointer, 0);
    } catch (e) {
      // 下潜
      return mkdir(dirname, --pointer);
    }

  } else { // 负向 创建目录
    try {
      // 创建
      mkdirSync(path.join(...dirname.split(path.sep).slice(0, pointer)));
      // 完成
      if (!direction && pointer === dirname.split(path.sep).length) return 0;
      // 上浮
      return mkdir(dirname, ++pointer, direction);
    } catch (err) {
      // 错误
      console.warn(err);
      return err;
    }

  }
};

exports.mkdir = mkdir
