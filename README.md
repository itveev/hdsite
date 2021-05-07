# help-desk-client
> web interface for help desk service

## Setup

- install node version>=7  from github.com/nodesource/distributors
- install npm version>=4
- install svn
- svn chekout
- in svn WD install all project dependencies from package.json
``` bash
npm i
```

## Build

- see "script" section in package.json

``` bash
# build client script for development
npm run mcd
# build client script for production
npm run mcp
# run dev server
npm run sd
# run prod server
npm run sp
# Build client app and start server
npm start
# Run prod server with babel
npm run sbp
# Open Cypress window with the list of E2E tests
npm run co
# Run all unit tests with Jest
npm run tu
# Run all E2E tests with Cypress
npm run ti
# Run all tests 
npm test
# Build client app, start server and run all tests
npm run tf
```

## Project structure

- See vuejs-templates.github.io/webpack/structure.html
