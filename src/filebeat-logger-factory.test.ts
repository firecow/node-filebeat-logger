import {create} from './index'

import MockDate from 'mockdate'

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

const logger = create({logLevel: 'debug'});

test('Check logger debug default streams', () => {
    logger.debug('Text Message');
    expect(spyStdout).toHaveBeenLastCalledWith(`{"@timestamp":"2019-05-14T11:01:58.135Z","message":"Text Message","log.level":"debug"}\n`);
    expect(spyStderr).toBeCalledTimes(0)
});

test('Check logger info default streams', () => {
    logger.info('Text Message');
    expect(spyStdout).toHaveBeenLastCalledWith(`{"@timestamp":"2019-05-14T11:01:58.135Z","message":"Text Message","log.level":"info"}\n`);
    expect(spyStderr).toBeCalledTimes(0)
});

test('Check logger warning default streams', () => {
    logger.warn('Text Message');
    expect(spyStderr).toHaveBeenLastCalledWith(`{"@timestamp":"2019-05-14T11:01:58.135Z","message":"Text Message","log.level":"warn"}\n`);
    expect(spyStdout).toBeCalledTimes(0)
})

test('Check logger error default streams', () => {
    logger.error('Text Message');
    expect(spyStderr).toHaveBeenLastCalledWith(`{"@timestamp":"2019-05-14T11:01:58.135Z","message":"Text Message","log.level":"error"}\n`);
    expect(spyStdout).toBeCalledTimes(0)
})
