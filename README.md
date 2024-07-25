# express-react-monorepo

An API and React app served by Express

```
express-react-monorepo/
├── dist/
│   ├── client
│   └── server
├── node_modules/
├── tests/
├── src/
│   ├── client/
│   │   ├── index.html
│   │   ├── node-modules/
│   │   ├── public/
│   │   ├── src/
│   │   │   ├── assets/
│   │   │   ├── components/
│   │   │   │   ├── LoginForm.jsx
│   │   │   │   └── Navigation.jsx
│   │   │   ├── pages/
│   │   │   │   ├── Home.jsx
│   │   │   │   └── Protected.jsx
│   │   │   ├── App.jsx
│   │   │   ├── App.less
│   │   │   ├── index.less
│   │   │   └── main.jsx
│   │   └── package.json etc...
│   └── server/
│       ├── server.js
│       └── app/
│           ├── app.js
│           ├── middleware/
│           │   ├── auth.js
│           │   └── middleware.js
│           └── routes/
│               ├── protected.js
│               └── public.js
├── .env
├── deploy.js
├── Dockerfile
├── fly.toml
├── .gitignore
├── .dockerignore
├── package.json
└── readme.md
```

## Goals

-  Get NODE_ENV logs to be accurate

### Instructions

-  Create new project
-  Install Express
-  Create Vite react project
-  Install React dependencies
-  Configure dist output in vite.config.js
-  Configure root/package.json scripts
-  Write dev script
   -  Install nodemon, concurrently
-  Remember to add production environment variables to fly.toml

   -  They have to use syntax like this:

   ```toml
   [env]
      VITE_NODE_ENV = "production"
   ```

   -  Also remember to gitignore fly.toml!

   ```

   ```

## Things I need to understand better

-  How Fly handles environment variables
-  How docker images & containers work

## To-Do List

-  [ ] Disclosure panel animations https://headlessui.com/react/disclosure
-  [ ] Make mobile menu close when you click outside
