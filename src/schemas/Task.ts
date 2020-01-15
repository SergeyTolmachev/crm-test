import {BaseSchema} from "./BaseSchema";

export const TaskSchema = {
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
};

export class Task extends BaseSchema {
    async findHighestPriority() {
        return super.findHighest('priority');
    }
}
