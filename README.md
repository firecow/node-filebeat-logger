# filebeat-logger
A winston logger that prints json lines in elastic common schema format

[![coverage](coverage/badge.svg)](https://npmjs.org/package/filebeat-logger)
[![build](https://github.com/firecow/node-filebeat-logger/workflows/build/badge.svg)](https://npmjs.org/package/filebeat-logger)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://npmjs.org/package/filebeat-logger)
[![npm](https://img.shields.io/npm/v/filebeat-logger?color=green)](https://npmjs.org/package/filebeat-logger)
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
