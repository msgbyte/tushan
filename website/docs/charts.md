---
sidebar_position: 6
---

# Charts

Chart display is an important part of backend management systems. As a ready-to-use best practice, `Tushan` comes with a charting library called `recharts` internally.

Of course, you can use your own custom library instead of the built-in one, and the bundling system will automatically filter out dependencies that are not imported.

You can import it as follows:

```ts
import { LineChart } from 'tushan/chart'
```

### Example

![](/img/docs/misc/chart.png)

For more information and examples about `recharts`, you can visit its official documentation: [https://recharts.org/en-US/examples](https://recharts.org/en-US/examples)
