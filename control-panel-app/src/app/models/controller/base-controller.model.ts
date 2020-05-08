/**
 * controller base model
 */
export class BaseController {

    /**
     * type
     */
    type: 'playvr' | 'polygon';
    /**
     * id
     */
    id: string;

    /**
     * online
     */
    online: Date;

    connected: string | Date;

    token: string;

    authorized: boolean;

    name: string;

    display_name: string;

    address: string;

    uuid: string;

    ip: string;

    constructor(model) {
        Object.keys(model).forEach(key => {
            this[key] = model[key];
        });
    }
}
