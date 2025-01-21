# Johnson County, Iowa React Template

Welcome to the Johnson County, Iowa React Template!

This application is intended to serve as the foundational piece for the React-based front ends of Johnson County, Iowa

## Quick Start

1. Create a new repository for your application from a copy of this repository
2. `npm install`
3. `npm start`

## Development

### Architecture

When in doubut about whether or not to use the components folder, add the component to the shared [Components Library](https://devops.jc.net/JCIT/Business%20Solutions%20Delivery/_git/JCComponentLibrary?path=%2FREADME.md&version=GBmaster&_a=preview)

```js
📂 src
├─ 📂 api // api request logic
│  ├─ 📄 EntityApi.ts // class grouping entity related api calls
├─ 📂 assets // image files
│  ├─ 📄 image.svg
│  └─ 📄 image.png
├─ 📂 pages // internal routes and app router
│  ├─ 📂 HomePage
│  │  └─ 📄 HomePage.tsx
│  ├─ 📂 AnotherPage
│  │  ├─ 📄 AnotherPage.tsx
│  │  └─ 📄 AnotherPageActionsPanel.tsx
│  └─ 📄 Router.tsx
├─ 📂 components // app-specific components
│  ├─ 📂 Component
│  │  └─ 📄 Component.tsx
│  └─ 📂 AnotherComponent
│     └─ 📄 AnotherComponent.tsx
├─ 📄 App.tsx
├─ 📄 main.tsx
```

### Routing / Navigation

For internal routes / navigation, we are using [React Router](https://reactrouter.com/en/main)

Please find the app routes in `src/Router.tsx`

When using a page template with a designated outlet, please ensure all routes are [children](https://reactrouter.com/en/main/start/overview#nested-routes) of the base route (`''`)

### Environment variables

https://vite.dev/guide/env-and-mode

Please create `.env` in your top level directory and copy over all values from `.env.public`

### Styling

For styling and layout, we are relying on the [Johnson County Component Library](https://devops.jc.net/JCIT/Business%20Solutions%20Delivery/_git/JCComponentLibrary?path=%2FREADME.md&version=GBmaster&_a=preview) and [@emotion/styled](https://emotion.sh/docs/styled)

#### Updating the component library

`npm install jcicl@latest`

### Building

`npm run build`

### Deployment

TODO
