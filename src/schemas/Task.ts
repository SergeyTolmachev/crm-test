import { validate } from "../utils";

const schema = {
    save: {
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
    },
    destroy: {
        type: 'object',
        additionalProperties: false,
        required: ['id'],
        properties: {
            id: {
                type: 'integer',
                minimum: 1,
            }
        }
    }
};

export class Task {
    private query: any;
    constructor(query: any) {
        this.query = query;
    }

    async save(title: string, priority: number) {
        const { success, errors } = validate(schema.save, { title, priority });
        if (!success) {
            return errors;
        }
        const { rows } = await this.query('INSERT INTO task (title, priority) VALUES($1, $2) RETURNING *', [title, priority]);
        return rows[0];
    }

    async destroy(id: number) {
        const { success, errors } = validate(schema.destroy, { id });
        if (!success) {
            return errors;
        }
        const { rows } = await this.query('DELETE FROM task WHERE id=$1 RETURNING *', [id]);
        return rows[0];
    }

    async findOne() {
        const { rows } = await this.query('SELECT * FROM task ORDER BY priority DESC LIMIT 1');
        return rows[0];
    }

    async findAll() {
        const { rows } = await this.query('SELECT * FROM task');
        return rows;
    }
}
