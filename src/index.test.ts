import {FilebeatLoggerUtils} from './filebeat-logger-utils'

import MockDate from 'mockdate'
import {create} from "./filebeat-logger-factory";

const spyStdout = jest.spyOn(process.stdout, 'write').mockImplementation();
const spyStderr = jest.spyOn(process.stderr, 'write').mockImplementation();
MockDate.set("2019-05-14T11:01:58.135Z");

afterEach(() => {
    spyStdout.mockClear();
    spyStderr.mockClear();
});

afterAll(() => {
    spyStdout.mockRestore();
    spyStderr.mockRestore();
    MockDate.reset();
})


test('Check logger debug default streams', () => {
    const logger = create({logLevel: 'debug'});
    logger.debug('Text Message');
    expect(spyStdout).toHaveBeenLastCalledWith(`{"@timestamp":"2019-05-14T11:01:58.135Z","message":"Text Message","log.level":"debug"}\n`);
    expect(spyStderr).toBeCalledTimes(0)
});

test('Check logger info default streams', () => {
    const logger = create({logLevel: 'debug'});
    logger.info('Text Message');
    expect(spyStdout).toHaveBeenLastCalledWith(`{"@timestamp":"2019-05-14T11:01:58.135Z","message":"Text Message","log.level":"info"}\n`);
    expect(spyStderr).toBeCalledTimes(0)
});

test('Check logger warning default streams', () => {
    const logger = create({logLevel: 'debug'});
    logger.warn('Text Message');
    expect(spyStderr).toHaveBeenLastCalledWith(`{"@timestamp":"2019-05-14T11:01:58.135Z","message":"Text Message","log.level":"warn"}\n`);
    expect(spyStdout).toBeCalledTimes(0)
})

test('Check logger error default streams', () => {
    const logger = create({logLevel: 'debug'});
    logger.error('Text Message');
    expect(spyStderr).toHaveBeenLastCalledWith(`{"@timestamp":"2019-05-14T11:01:58.135Z","message":"Text Message","log.level":"error"}\n`);
    expect(spyStdout).toBeCalledTimes(0)
})

test('Check log level info', () => {
    const logger = create({logLevel: 'info'});
    logger.debug('Text Message');
    logger.info('Text Message');
    logger.warn('Text Message');
    logger.error('Text Message');
    expect(spyStderr).toBeCalledTimes(2)
    expect(spyStdout).toBeCalledTimes(1)
})

test('Check log level warn', () => {
    const logger = create({logLevel: 'warn'});
    logger.debug('Text Message');
    logger.info('Text Message');
    logger.warn('Text Message');
    logger.error('Text Message');
    expect(spyStderr).toBeCalledTimes(2)
    expect(spyStdout).toBeCalledTimes(0)
})

test('Check log level error', () => {
    const logger = create({logLevel: 'error'});
    logger.debug('Text Message');
    logger.info('Text Message');
    logger.warn('Text Message');
    logger.error('Text Message');
    expect(spyStderr).toBeCalledTimes(1)
    expect(spyStdout).toBeCalledTimes(0)
})

test('Meta ordering', () => {
    const logger = create({logLevel: 'debug'});
    logger.debug('Text Message', {'error.message': 'Heyaa'});
    expect(spyStdout).toBeCalledTimes(1)
    expect(spyStdout).toHaveBeenLastCalledWith(`{"@timestamp":"2019-05-14T11:01:58.135Z","message":"Text Message","log.level":"debug","error.message":"Heyaa"}\n`);
})

test('Expand meta err or error', () => {
    const logger = create({logLevel: 'error'});
    const err = new Error("Test Error");
    err.stack = "Error: Test Error\nTest Stack Trace"
    logger.error('', { err });
    expect(spyStderr).toBeCalledTimes(1)
    const expected = `{"@timestamp":"2019-05-14T11:01:58.135Z","message":"","log.level":"error","error.message":"Test Error","error.stack_trace":"Error: Test Error\\nTest Stack Trace"}\n`;
    expect(spyStderr).toHaveBeenLastCalledWith(expected);
})

test('Add ECS fields', () => {
    const info = {level: 'info', message: 'lålå'};
    FilebeatLoggerUtils.addEcsFields(info);
    expect(info).toStrictEqual({'@timestamp': "2019-05-14T11:01:58.135Z", 'log.level': 'info', 'message': 'lålå'});
});

test('Add $APP_ENV to ecs tags', () => {
    const info = {level: 'info', message: 'lålå'};
    process.env['APP_ENV'] = 'stage';
    FilebeatLoggerUtils.addEnvironmentTag(info);
    expect(info).toStrictEqual({'level': 'info', 'message': 'lålå', 'tags': "stage"});
});

test('Add $APP_ENV to existing ecs tags', () => {
    const info = {level: 'info', message: 'lålå', tags: 'city'};
    process.env['APP_ENV'] = 'prod';
    FilebeatLoggerUtils.addEnvironmentTag(info);
    expect(info).toStrictEqual({'level': 'info', 'message': 'lålå', 'tags': "city, prod"});
});

test('Explode json in message', () => {
    const info = {level: 'info', message: '{"log.logger": "system"}'};
    FilebeatLoggerUtils.explodeJsonInMessage(info);
    expect(info).toStrictEqual({'level': 'info', 'message': '{"log.logger": "system"}', 'log.logger': "system"});
});

test('Order keys of object', () => {
    const info = {'error.message': 'Heya', level: 'info', message: 'Test'};
    FilebeatLoggerUtils.orderKeys(info, ['message', 'level']);
    expect(Object.keys(info)).toStrictEqual(['message', 'level', 'error.message']);
});
