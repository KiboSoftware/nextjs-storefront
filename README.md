<h2 align="center">KiboCommerce & Next.JS</h2>

<p align="center">
This is a headless ecommerce starter kit for KiboCommerce platform using Next.JS <br>
Demo: <a href="https://nextjs-storefront-kibo-commerce.vercel.app">https://nextjs-storefront-kibo-commerce.vercel.app</a>
</p>

### Features

- Performant by default
- SEO Ready
- Internationalization
- Responsive
- UI Components built on top of Material UI 5
- Theming
- KiboCommerce data hooks
- PWA Ready
- Omni Channel Capability (Ship to home and Pickup in Store support)

## Getting Started

1. Clone this repo

```bash
git clone https://github.com/KiboSoftware/nextjs-storefront.git
```

2. Change into directory and install dependencies

```bash
npm install
```

3. Copy .env template

```bash
cp .env.template .env.local
```

4. Configure env variables for your Kibo Commerce environment
5. Start Dev server

```bash
npm run dev
```

## Configuration

.env example

```bash
KIBO_API_HOST=t1234-s1234.sandbox.mozu.com
KIBO_AUTH_HOST=home.mozu.com
KIBO_CLIENT_ID=KIBO_APP.1.0.0.Release
KIBO_SHARED_SECRET=12345_Secret
```

The following data is required to configure the storefront to communicate with your Kibo API Client.

- `apiHost` - Your Kibo Commerce API Host.
- `authHost` - Kibo Commerce Authentication Host Server. It is used to request an access token from Kibo Commerce OAuth 2.0 service. Production and Production sandbox, use `home.mozu.com`
- `clientId` - Unique Application (Client) ID of your Application
- `sharedSecret` - Secret API key used to authenticate application. Viewable from your [Kibo eCommerce Dev Center](https://mozu.com/login)

Visit [Kibo documentation](https://apidocs.kibong-perf.com/?spec=graphql#auth) for more details on API authentication

## Useful Commands

```bash
npm run dev # Start dev server
npm run build # Run production build
npm run start # Run production start
npm run generate-types # generate typescript Kibo API types from GraphQL Schema
npm run storybook # start storybook for
npm run test # run unit / integration tests
```

## Built with

- Framework - [Next.JS](https://nextjs.org/docs)
- Component Library - [Material UI 5](https://mui.com/material-ui/getting-started/overview/)
- Testing - [Jest](https://jestjs.io/docs/getting-started)
- Data Fetching / State Management - [React Query](https://react-query-v3.tanstack.com/overview)
- Localization - [Next i18Next](https://github.com/i18next/next-i18next)

## Import KiboCommerce demo data for ContentStack

Seed your ContentStack Stack with content seen in the Kibo Commerce demo using the ContentStack CLI.
For full details, please check ContentStack's CLI Documentation

### Prerequisites

    Contentstack account
    Node.js version 8 or above

### Steps

1. Install ContentStack CLI

```bash
npm install -g @contentstack/cli
```

2. Login to target stack using CLI session

```bash
csdx auth:login   # Use target/import stack credentials
```

3. After successful login, run this command to import your content from github repo to the target “stack”:  
   Replace `<stack_ApiKey>` with your ContentStack api key

```bash
csdx cm:stacks:seed --repo "KiboSoftware/stack-contentstack" -k <stack_ApiKey>
```

## Import KiboCommerce demo data for Contentful

Seed your Contentful Space with content seen in the Kibo Commerce demo using the Contentful CLI.
For full details, please check Contentful's CLI Documentation

### Prerequisites

Contentful account

### Steps

1. Install Contentful CLI

```bash
npm install -g contentful-cli
```

2. Login to target space using CLI session

```bash
contentful login   # Use target/import space credentials
```

3. After successful login, run this command to import your content from exported directory to the target “space”:  
   Replace `<path_to_import_target-space-config>` with your export.json path

```bash
contentful space import --config “<path_to_import_target-space-config>”
```

## Contributions

All contributions welcome!
