export interface SchemaValidation {
    INSTANCE_NAME: string;
    validate(data: object): string[];
}

export interface SchemaValidationItem {
    key: string;
    required: boolean;
}
