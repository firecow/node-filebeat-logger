import {addEcsFields, addEnvironmentTag, explodeJsonInMessage, orderKeys} from './index'
import MockDate from 'mockdate'

// Mock global date
MockDate.set("2019-05-14T11:01:58.135Z");

test('Add ECS fields', () => {
    const info = {level: 'info', message: 'lålå'};
    addEcsFields(info);
    expect(info).toStrictEqual({'@timestamp': "2019-05-14T11:01:58.135Z", 'log.level': 'info', 'message': 'lålå'});
});

test('Add $APP_ENV to ecs tags', () => {
    const info = {level: 'info', message: 'lålå'};
    process.env.APP_ENV = 'stage';
    addEnvironmentTag(info);
    expect(info).toStrictEqual({'level': 'info', 'message': 'lålå', 'tags': "stage"});
});

test('Add $APP_ENV to existing ecs tags', () => {
    const info = {level: 'info', message: 'lålå', tags: 'city'};
    process.env.APP_ENV = 'prod';
    addEnvironmentTag(info);
    expect(info).toStrictEqual({'level': 'info', 'message': 'lålå', 'tags': "city, prod"});
});

test('Explode json in message', () => {
    const info = {level: 'info', message: '{"log.logger": "system"}'};
    explodeJsonInMessage(info);
    expect(info).toStrictEqual({'level': 'info', 'message': '{"log.logger": "system"}', 'log.logger': "system"});
});


test('Order keys of object', () => {
    const info = {level: 'info', message: 'Test'};
    orderKeys(info, ['message', 'level']);
    expect(Object.keys(info)).toStrictEqual(['message', 'level']);
});
