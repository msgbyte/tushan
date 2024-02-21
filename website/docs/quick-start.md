---
sidebar_position: 2
---

# Quick Start

## Quickly Create a New Application Using Command Line

```bash
# Choose one of the package management tools you are using
npm create tushan
yarn create tushan
pnpm create tushan
```

> The scaffolding provides two sets of template options: `default` and `express`.

> If you want a ready-to-use full-stack project, you can choose the `express` template. Otherwise, choose `default` to create a pure frontend project.

After creation, navigate to the application directory and execute:

```bash
npm install
npm run dev
```

## Project Structure

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

The template project is a frontend project implemented based on `vite`, consisting mainly of `App.tsx`, `auth.ts`, and `fields.ts`.

- `App.tsx`: Main configuration and entry points for various content.
- `auth.ts`: Authentication-related content.
- `fields.ts`: Resource field configurations.

> `vite` is a frontend tool based on `rollup` that provides fast compilation. [Learn more](https://vitejs.dev/)

We only need to make simple modifications to `fields` to quickly adjust resource fields.
