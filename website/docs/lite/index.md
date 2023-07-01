---
sidebar_position: 1
title: Tushan Lite
---

## 什么是 Tushan Lite

Tushan Lite 是基于Tushan的纯配置化解决方案，只需要一个简单的配置文件即可实现一整套的后台管理项目的前端实现.

## 快速体验

你可以访问 [https://tushan-lite.msgbyte.com/?config=https://tushan-lite.msgbyte.com/demo.json](https://tushan-lite.msgbyte.com/?config=https://tushan-lite.msgbyte.com/demo.json) 查看示例项目

查看 [https://tushan-lite.msgbyte.com/demo.json](https://tushan-lite.msgbyte.com/demo.json) 可以查看demo配置

![](/img/docs/misc/tushan-lite.png)

### 使用自定义配置

你可以在`?config=`后追加上自己的配置文件，如: `https://tushan-lite.msgbyte.com/?config=<config-url>`

## Tushan Lite会盗取拦截用户信息么

不会，Tushan Lite 只是一个前端运行的容器，如果了解过 `react native`/ `Swagger` 就可以理解，`Tushan Lite` 的地位类似于 `Expo`/`Swagger`, 具体的后端实现还是需要发送到远程你自己的服务器上的。

如果仍然不放心，可以自行编译/部署到自己的服务器上。源码在这里: [https://github.com/msgbyte/tushan/tree/master/lite](https://github.com/msgbyte/tushan/tree/master/lite)
