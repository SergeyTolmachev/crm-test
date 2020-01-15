import {query} from '../config/db';
import { validate } from '../utils';

interface Schema {
    type: string,
    additionalProperties?: boolean,
    required?: string [],
    properties: any,
}

interface SchemaOptions {
    customQuery?: any,
}

export class BaseSchema{
    private readonly query: any;
    private readonly name: string;
    private readonly schema: any;

    constructor(name: string, schema: Schema, options?: SchemaOptions) {
        this.query = query;
        this.name = name;
        this.schema = schema;
        if (options) {
            const { customQuery } = options;
            this.query = customQuery || query;
        }
    }

    async save(values: any) {
        validate(this.schema, values);
        const keys = Object.keys(values);
        const properties: string [] = [];
        const val: any [] = [];
        keys.forEach((key, index) => {
            properties.push(`$${index+1}`);
            val.push(values[key]);
        });

        const { rows } = await this.query(`INSERT INTO ${this.name} (${keys.join(',')}) VALUES(${properties.join(',')}) RETURNING *`, val);
        return rows[0];
    }

    async destroy(id: number) {
        const { rows } = await this.query(`DELETE FROM ${this.name} WHERE id=$1 RETURNING *`, [id]);
        return rows[0];
    }

    async findOne(properties: { order?: string }) {
        const { order } = properties;
        const { rows } = await this.query(`SELECT * FROM ${this.name} ORDER BY ${order} DESC LIMIT 1`);
        return rows[0];
    }

    async findAll() {
        const { rows } = await this.query(`SELECT * FROM ${this.name}`);
        return rows;
    }
}
