# 2night

Website [2night.ch](https://2night.ch) - for a marvelous night

## Getting started

### firebase tools & backend

- `npm install -g firebase-tools` (Java > 11 is required by firebase-tools)
- `firebase emulators:start` or use `firebase emulators:start --import ./emulators-data --export-on-exit ./emulators-data` to persist your data i.e. users
- Open new terminal in the repositories directory
- `cd functions`
- `npm i && npm run build:watch` is used to transpile typescript into javascript. The firebase-emulators hot reload the application automatically then.

### frontend (react)

- `cd web`
- `npm i && npm start`
- Website opens in a new browser tab under `http://localhost:3000`
- The website automatically connects to the emulators as long the NODE_ENV is set to `development`
