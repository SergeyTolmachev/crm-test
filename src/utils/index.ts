import Ajv from 'ajv';

const ajv = new Ajv();

export const validate = (schema: any, data: any) => {
        const valid = ajv.validate(schema, data);
        if (valid) {
            return true;
        }
};
