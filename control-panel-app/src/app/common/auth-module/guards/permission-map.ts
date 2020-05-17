// TODO refactor and move in config file
export interface PermissionMap {
    [key: string]: string[];
}

export const MenuPermissionMap: PermissionMap = {
    'teleport-ng': ['admin'],
    'ng-servers': ['admin'],
    'ng-games': ['admin'],
    settings: null,
    permissions: null,
    cashbox: ['admin'],
    'cashbox-machines': ['admin'],
    gates: null,
    gate: null,
    zones: ['admin'],
    'teleport-vr': ['admin'],
    'vr-machines': ['admin'],
    'ng-controllers': ['admin'],
    'vr-games': ['admin'],
    'teleport-poly': null,
    'poly-servers':  null,
    'poly-controllers': null,
    park: ['admin'],
    sessions: ['admin'],
    cards: ['admin'],
    visitors: ['admin'],
    'visitors/:id': ['admin'],
    staff: ['admin'],
    packages: ['admin'],
    'packages/add': ['admin'],
    'packages/add/:id': ['admin'],
    'add/:id': ['admin'],
    promo: ['admin'],
    pricing: null,
    billing: ['admin'],
    transactions: ['admin'],
    invoices: ['admin'],
    accounts: ['admin'],
    games: ['admin']
};
