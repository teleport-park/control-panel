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
    gates: ['admin'],
    gate: ['admin'],
    zones: ['admin'],
    'teleport-vr': ['admin'],
    'vr-machines': ['admin'],
    'vr-controllers': ['admin'],
    'vr-games': ['admin'],
    'teleport-poly': null,
    'poly-servers': ['admin'],
    'poly-controllers': ['admin'],
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
