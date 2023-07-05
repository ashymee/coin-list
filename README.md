# REACT APP CRUD (COIN LIST)

- [figma](https://www.figma.com/file/GrG0uxjxTK34D9HfRC5jCo/Test-ReactJS?type=design&node-id=0-1&mode=design)
- [api](https://api.coinpaprika.com/v1/coins/)

---

code structure:

```sh
├── index.html
├── package.json
├── postcss.config.js
├── public
│   ├── coins.json
│   └── vite.svg
├── README.md
├── src
│   ├── assets
│   │   └── react.svg
│   ├── components
│   │   ├── Content.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Layout.tsx
│   │   ├── Navigation.tsx
│   │   └── Table.tsx
│   ├── main.tsx
│   ├── pages
│   │   ├── Coin
│   │   │   ├── detail.tsx
│   │   │   └── index.tsx
│   │   └── Home.tsx
│   ├── router
│   │   └── index.ts
│   ├── styles
│   │   └── global.css
│   ├── utils
│   │   ├── useConstants.ts
│   │   └── useStores.ts
│   └── vite-env.d.ts
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

---

### How to use

1. copy this repo

```sh
git clone https://github.com/ashymee/coin-list
cd coin-list
```

2. install required packages

```sh
# using npm
npm install

# or using yarn
yarn install

# or using pnpm
pnpm install
```

3. run it on your local machine

```sh
# using npm
npm dev

# or using yarn
yarn dev

# or using pnpm
pnpm dev
```

4. go to browser, than access `http://localhost:5173`.

5. build & run production for deployment purposes (optional)

5.1. build

```sh
# using npm
npm build

# or using yarn
yarn build

# or using pnpm
pnpm build
```

5.2. run it on your local machine

```sh
# using npm
npm preview

# or using yarn
yarn preview

# or using pnpm
pnpm preview
```

5.3. go to browser, than access `http://localhost:4173`.
---

[LIVE DEMO](https://coin-list-drab.vercel.app).