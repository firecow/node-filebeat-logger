# filebeat-logger
A winston logger that prints json lines in elastic common schema format

---

## Install
```sh
npm install --save filebeat-logger
```

## Usage
```js
const FilebeatLogger = require('filebeat-logger')
const logger = FilebeatLogger.create();

logger.info('I am a info message')
```
