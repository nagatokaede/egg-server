git add README.md# egg-server

egg server

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
$ open http://localhost:7001/swagger-doc
$ open http://localhost:7001/swagger-ui.html
$ open http://localhost:7001/public/index.html
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org

## 目录结构说明
```
├─app
│  ├─contract # egg-swagger-doc 入参定义
│  ├─controller # Controller 层负责具体的业务模块流程的控制，在此层里面要调用Serice层的接口来控制业务流程
│  ├─extend # 扩展方法
│  ├─middleware # 中间件
│  ├─model # mongodb model 定义
│  ├─public # 静态文件目录
│  │  └─uploads # 上传文件目录
│  └─service # Service 层主要负责业务模块的逻辑应用设计，封装Service层的业务逻辑有利于通用的业务逻辑的独立性和重复利用性，程序显得非常简洁。
└─config # egg 配置及中间件挂载
```
