---
sidebar_position: 6
---

# 图表

图表展示是后台管理系统重要一环，`Tushan` 作为一个开箱即用的最佳实践内部自带了一个图表库 `recharts`

当然你可以不用自带的而使用自定义的库，打包系统会自动过滤到没有引入依赖

你可以通过如下方式引入:

```ts
import { LineChart } from 'tushan/chart'
```

### 示例

![](/img/docs/misc/chart.png)


更多关于 `recharts` 的介绍与示例可以访问他的官方文档: [https://recharts.org/en-US/examples](https://recharts.org/en-US/examples)
