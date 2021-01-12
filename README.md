# filebeat-logger
A winston logger that prints json lines in elastic common schema format

![coverage](coverage/badge.svg)
![build](https://github.com/firecow/node-filebeat-logger/workflows/build/badge.svg)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![npm package](https://badge.fury.io/js/filebeat-logger.svg)

---

## Install
```sh
npm install --save filebeat-logger
```

## Usage
```js
const filebeatLogger = require('filebeat-logger')
const logger = filebeatLogger.create('info', ['@timestamp', 'message'], ['error', 'warn']);

logger.info('I am an info message')
```
