import { SchemaValidationItem } from '../models/intefaces';

export const GameSchema: SchemaValidationItem[] = [
    {
        key: 'id',
        required: true
    }, {
        key: 'name',
        required: true
    }, {
        key: 'category',
        required: true
    }, {
        key: 'maxPlayers',
        required: true
    }, {
        key: 'maxDuration',
        required: true
    }, {
        key: 'price',
        required: true
    }
];

export const StaffSchema: SchemaValidationItem[] = [
    {
        key: 'id',
        required: true
    }, {
        key: 'name',
        required: true
    }, {
        key: 'display_name',
        required: true
    }, {
        key: 'created_at',
        required: true
    }, {
        key: 'updated_at',
        required: true
    }, {
        key: 'hired_at',
        required: true
    }, {
        key: 'hired_at',
        required: false
    }, {
        key: 'passport',
        required: false
    }, {
        key: 'high_education',
        required: false
    }, {
        key: 'roles',
        required: true
    }
];

export const VisitorSchema: SchemaValidationItem[] = [
    {key: 'id', required: true},
    {key: 'name', required: true},
    {
        key: 'gender',
        required: true
    }, {
        key: 'email',
        required: true
    }, {
        key: 'phone',
        required: true
    }, {
        key: 'age',
        required: true
    }, {
        key: 'display_name',
        required: true
    }, {
        key: 'birthday',
        required: true
    }, {
        key: 'balance',
        required: true
    }
];

export const TNGServersSchema: SchemaValidationItem[] = [
    {key: 'id', required: true},
    {key: 'type', required: true},
    {key: 'display_name', required: true},
    {key: 'name', required: true},
    {key: 'address', required: true},
    {key: 'enabled', required: true},
    {key: 'bound', required: true},
    {key: 'online', required: true}
];


