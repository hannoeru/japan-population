# 都道府県別人口推移グラフ

- 都道府県にチェックを入れると、RESAS APIから選択された都道府県の「人口構成」が表示されます。
- 「総人口」「年少人口」「生産年齢人口」「老年人口」をクリックすると表示するグラフデータを切り替えることができます。
- 一番下の「月」もしくは「太陽」のアイコンをクリックするとダークモードとライトモードに切り替えることができます。

## Setup

Make sure to install the dependencies:

```bash
# using corepage for package manager management
corepack enable
# install dependencies
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm run dev
```

## Testing

Running test:

> [!WARNING]
> Will required a running dev server for all e2e tests.
> Because currently nuxt testing tool didn't have support on cloudflare build. [issue](https://github.com/nuxt/test-utils/issues/934)

```bash
# run dev server (required for e2e test)
pnpm run dev

# run all tests (including e2e test)
pnpm run test

# run tests without e2e tests
pnpm run test --exclude=e2e

# type check
pnpm run typecheck
```

## Lint and format

All lint and format is done by ESLint, no require for other formatting tools.

```bash
# run lint and format
pnpm run lint

# run with auto fix
pnpm run lint:fix
```

## Production

Build the application for production:

```bash
pnpm run build
```

Locally preview production build:

```bash
pnpm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
