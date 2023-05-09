---
sidebar_position: 2
---

# 快速开始

## 使用命令行快速创建一个新的应用

```bash
# 根据你所用的包管理工具任选其一
npm create tushan
yarn create tushan
pnpm create tushan
```

> 脚手架提供两套模板方案: `default` 和 `express`

> 如果你想要一套开箱即用的前后端一体的项目，可以选择 `express` 模板，否则选择 `default` 创建一个纯前端项目

创建完毕后 cd 到应用目录，执行:

```bash
npm install
npm run dev
```

## 项目结构

```
.
├── index.html
├── package.json
├── public
│   └── logo.svg
├── src
│   ├── App.tsx
│   ├── auth.ts
│   ├── fields.ts
│   ├── main.tsx
│   └── vite-env.d.ts
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

模板项目是基于`vite`实现的前端项目，主要内容是 `App.tsx`, `auth.ts`, `fields.ts`

- `App.tsx`: 主要配置与各内容的入口
- `auth.ts`: 身份鉴权相关内容
- `fields.ts`: 资源字段配置

> `vite` 是一个基于`rollup`的提供快速编译的前端工具. [了解更多](https://vitejs.dev/)

我们只需要通过简单的修改 `fields` 即可实现快速调整资源字段。
