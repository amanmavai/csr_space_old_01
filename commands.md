```js
$ pnpm create vite@latest . -- --template react-ts

$ pnpm add react-router-dom localforage match-sorter sort-by

// add tailwindcss (https://tailwindcss.com/docs/guides/vite)
$ pnpm add -D tailwindcss postcss autoprefixer postcss-import
$ npx tailwindcss init -p

// add prettier
$ pnpm add -D prettier prettier-plugin-tailwindcss

// add eslint
$ pnpm add -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react

$ pnpm dlx shadcn-ui@latest init

$ pnpm dlx shadcn-ui@latest add select

$ pnpm add xstate
$ pnpm add @xstate/react

$ pnpm add @tanstack/react-query
$ pnpm add -D @tanstack/eslint-plugin-query
$ pnpm add @tanstack/react-query-devtools

```