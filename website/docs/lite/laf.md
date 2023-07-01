---
sidebar_position: 2
title: 在 Laf 中使用
---

> `Laf` 是一个集函数、数据库、存储为一体的云开发平台

我们可以通过 `Tushan` 预设好的库快速实现 `Laf` 数据库的后台管理页面，仅需要简单配置一下字段列表即可快速实现后台管理系统

## 如何使用

### 从函数市场开始

你可以从 laf 的函数市场快速开始，点击使用模板以后则可以快速加入到你的应用

![](/img/docs/misc/laf-func-market.png)

为了你的数据库安全，请填入随机性比较大的密码与秘钥防止破解。


### 手动添加

在你的laf应用中创建一个拦截器(命名为: `__interceptor__`)

安装依赖`tushan-laf-json-server`, 版本取最新版即可

填入从以下内容开始:

```tsx
import { createTushanJsonServerInterceptor } from 'tushan-laf-json-server'

export default async function (ctx: FunctionContext) {
  try {
    return await createTushanJsonServerInterceptor(ctx as any, {
      auth: {
        /**
         * 请修改以下三个字段，分别是后台的用户名，密码，和秘钥签名字段
         */
        username: 'tushan',
        password: "tushan",
        secret: "tushan-secret"
      },
      config: {
        /**
         * 以下是数据库模型以及模型对应字段的名称和类型
         * 类型有: text,number,avatar,json,boolean,datetime,password,select,reference,textarea,email,image,url
         * 
         * action表示是否开启相应的功能，默认只有列表页面
         */
        resources: [
          {
            name: "test",
            fields: [
              {
                name: "id",
                type: "text"
              },
              {
                name: "content",
                type: "textarea",
              }
            ],
            action: {
              create: true,
              detail: true,
              edit: true,
              delete: true
            }
          }
        ]
      }
    });
  } catch (err) {
    console.error(err)
  } finally {
    return true;
  }
}
```

## 配置解释

在 `createTushanJsonServerInterceptor` 中需要两个参数, 分别是http请求的上下文 `ctx`, 和 tushan 所需要的配置选项.

我们主要说一下配置:

- `header`: 标题
- `footer`: 页脚
- `auth`: 鉴权相关
  - `username`: 后台用户名
  - `password`: 后台密码
  - `secret`: 用于签发token的秘钥，随机字符串即可
- `resources`: 一个数组，用于描述配置资源
  - `name`: 模型名，与laf的数据集名字对应
  - `label`: 显示名称，可选
  - `fields`: 模型字段, 是一个数字
    - `name`: 字段名
    - `type`: 字段类型, 内置支持 text,number,avatar,json,boolean,datetime,password,select,reference,textarea,email,image,url
    - `options`: 字段配置, 可选, 参考`tushan`的字段配置使用
  - `filter`: 筛选项，配置同`fields`
  - `action`: 启用的功能
    - `create`: 创建
    - `detail`: 详情
    - `edit`: 编辑
    - `delete`: 删除
- `authProvider`：可选，如果想实现自己的登录鉴权逻辑可以复写
- `dataProvider`：可选，如果想实现自己的资源获取逻辑可以复写

## 访问后台

部署完毕后访问 `https://tushan-lite.msgbyte.com/?config=https://<appid>.laf.dev/tushan` 即可打开, `<appid>` 需要换成你自己的`laf`应用的`appid`
