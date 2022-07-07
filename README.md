A winston logger that prints json lines in elastic common schema format

[![build](https://img.shields.io/github/workflow/status/firecow/node-filebeat-logger/build)](https://github.com/firecow/node-filebeat-logger/actions)
[![Known Vulnerabilities](https://snyk.io/test/github/firecow/node-filebeat-logger/badge.svg)](https://snyk.io/test/github/firecow/node-filebeat-logger)
[![npm](https://img.shields.io/npm/v/filebeat-logger)](https://npmjs.org/package/filebeat-logger)
[![license](https://img.shields.io/github/license/firecow/node-filebeat-logger)](https://npmjs.org/package/filebeat-logger)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=firecow_node-filebeat-logger&metric=alert_status)](https://sonarcloud.io/dashboard?id=firecow_node-filebeat-logger)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=firecow_node-filebeat-logger&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=firecow_node-filebeat-logger)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=firecow_node-filebeat-logger&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=firecow_node-filebeat-logger)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=firecow_node-filebeat-logger&metric=security_rating)](https://sonarcloud.io/dashboard?id=firecow_node-filebeat-logger)

[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=firecow_node-filebeat-logger&metric=coverage)](https://sonarcloud.io/dashboard?id=firecow_node-filebeat-logger)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=firecow_node-filebeat-logger&metric=code_smells)](https://sonarcloud.io/dashboard?id=firecow_node-filebeat-logger)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=firecow_node-filebeat-logger&metric=duplicated_lines_density)](https://sonarcloud.io/dashboard?id=firecow_node-filebeat-logger)

---

## Install
```sh
npm install --save filebeat-logger
```

## Usage
```js
const filebeatLogger = require('filebeat-logger')
const logger = filebeatLogger.create({
    logLevel: 'debug', // 'info' by default
    printTimestamp: false, // true by default
    keysOrder: ['@timestamp', 'message'], // ["@timestamp", "log.level", "message"] by default
    stderrLevels: ['warn', 'error'], // ["error", "warn", "warning"] by default
});

logger.info('I am an info message')
// {"@timestamp":"2022-01-30T14:49:00.323Z","message": "I am an info message","log.level":"info"}
```
