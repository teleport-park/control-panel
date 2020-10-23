// TODO refactor and move in config file
export interface PermissionMap {
    [key: string]: string[];
}

export const MenuPermissionMap: PermissionMap = {
    'teleport-ng': ['admin'],
    'ng-servers': ['admin'],
    'ng-games': null,
    cashbox: ['admin'],
    'cashbox-machines': ['admin'],
    gates: null,
    gate: null,
    zones: ['admin'],
    'teleport-vr': ['admin'],
    'vr-machines': ['admin'],
    'ng-controllers': ['admin'],
    'vr-games': null,
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
    prices: ['admin'],
    'games/edit': null,
    'games/edit/:id': null,
    'edit/:id': null,
    promo: ['admin'],
    billing: ['admin'],
    transactions: ['admin'],
    invoices: ['admin'],
    accounts: ['admin'],
    reports: ['admin'],
    'reports/:reportType': ['admin']
};
