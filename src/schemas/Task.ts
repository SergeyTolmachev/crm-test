import {BaseSchema} from './BaseSchema';

export class Task extends BaseSchema {
    async findHighestPriority() {
        return super.findOne({ order: 'priority' });
    }
}

export const task = new Task('task', {
    type: 'object',
    additionalProperties: false,
    required: ['title', 'priority'],
    properties: {
        title: {
            type: 'string',
            length: 255,
        },
        priority: {
            type: 'integer',
            minimum: 0,
            maximum: 100,
        }
    }
});

