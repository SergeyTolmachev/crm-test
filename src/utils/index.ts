import Ajv from 'ajv';

const ajv = new Ajv();

interface Error {
    success: boolean,
    errors?: any,
}

export const validate = (schema: any, data: any): Error => {
    try {
        const valid = ajv.validate(schema, data);
        if (!valid){
            return {
                success: false,
                errors: ajv.errors,
            }
        }

        return {
            success: true,
        }
    } catch (error) {
        return {
            success: false,
            errors: ajv.errors,
        }
    }
};
