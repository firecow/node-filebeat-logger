# filebeat-logger
A winston logger that prints json lines in elastic common schema format

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/filebeat-logger.svg)](https://badge.fury.io/js/filebeat-logger)

---

## Install
```sh
npm install --save filebeat-logger
```

## Usage
```js
const filebeatLogger = require('filebeat-logger')
const logger = filebeatLogger.create('info', ['@timestamp', 'message'], ['error', 'warn']);

logger.info('I am a info message')
```
