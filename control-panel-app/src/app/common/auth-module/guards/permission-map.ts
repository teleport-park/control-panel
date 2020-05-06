// TODO refactor and move in config file
export interface PermissionMap {
    [key: string]: string[];
}

export const MenuPermissionMap: PermissionMap = {
    'teleport-ng': ['admin'],
    'ng-servers': ['admin'],
    'ng-games': ['admin'],
    settings: ['admin'],
    permissions: ['admin'],
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
    staff: ['admin'],
    packages: ['admin'],
    pricing: ['admin'],
    billing: ['admin'],
    transactions: ['admin'],
    invoices: ['admin'],
    accounts: ['admin'],
    games: ['admin']
};
