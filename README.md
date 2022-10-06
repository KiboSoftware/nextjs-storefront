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

### Import stack content from Non-Contentstack's GitHub Repository using ContentStack Seed Commands

## Prerequisites

    Contentstack account
    Node.js version 8 or above
    CLI installed on your machine: npm install -g @contentstack/cli

## Steps

1. Create github repository with public access
2. Create a folder named “stack” in your machine.
   Example: Project Folder/Directory > stack (folder)
3. Login to Source Stack
   open your terminal and run this command to log in to the CLI session:

```bash
csdx auth:login  #This command will ask you to provide your "Source Stack" Contentstack account credentials.
```

4. After successful login, run this command to export your stack’s content to the “stack” folder:
   Syntax
   csdx cm:stacks:export -k <stack_ApiKey> -d “<path_to_store_content>”

For example:

```bash
csdx cm:stacks:export -k blt********** -d “C:\Users\Name\Desktop\content\stack”
```

5. add exported content on github repository

```bash
git init -b main    # it will initiate & create new branch "main", give any name for branch
git add .   #add all files & folders
git commit -m "initial commit"   #commit all added files & folders
```

6. copy github repository URL
1. On GitHub.com, navigate to the main page of the repository
1. click on "Code" button

Example https://github.com/KiboSoftware/stack-contentstack.git

7. Add remote github repository URL
   Syntax
   $ git remote add origin <REMOTE_URL> # Sets the new remote

```bash
git remote add origin https://github.com/KiboSoftware/stack-contentstack.git
git remote -v   # Verifies the new remote URL
git push -u origin main   # Pushes the changes in your local repository up to the remote repository you specified as the origin
```

8. Create Tag for Release on github repository
   Syntax
   git tag <Version Info>

```bash
git tag v-1.0.0
git push origin v-1.0.0
```

9. Chose Tag & create Releases
   1. On GitHub.com, navigate to the main page of the repository.
   2. To the right of the list of files, click Releases.
   3. Click "Draft a new release" button.
   4. Click Choose a tag, type a version number for your release, and press Enter. Alternatively, select an existing tag.
      Choose "v-1.0.0" # which was previously pushed from cli
   5. Type a title and description for your release. Default title will be selected tag - name like "v-1.0.0"
   6. Click on "Publish release" button at the bottom

For more information about release
https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository

10. Login to target stack using CLI session

```bash
csdx auth:login   # Use target/import stack credentials
```

11. After successful login, run this command to import your content from github repo to the target “stack”:
    Syntax
    csdx cm:stacks:seed --repo "<account/repository>" -k <stack_ApiKey>

```bash
csdx cm:stacks:seed --repo "KiboSoftware/stack-contentstack" -k blt**********
```

## Built with

- Framework - [Next.JS](https://nextjs.org/docs)
- Component Library - [Material UI 5](https://mui.com/material-ui/getting-started/overview/)
- Testing - [Jest](https://jestjs.io/docs/getting-started)
- Data Fetching / State Management - [React Query](https://react-query-v3.tanstack.com/overview)
- Localization - [Next i18Next](https://github.com/i18next/next-i18next)

## Contributions

All contributions welcome!

```

```
