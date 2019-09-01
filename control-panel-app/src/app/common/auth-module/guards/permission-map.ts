// TODO refactor and move in config file
export interface PermissionMap {
    [key: string]: string[];
}

export const MenuPermissionMap: PermissionMap = {
    'vr-games': ['admin'],
    'vr-machines': ['admin'],
    'teleport-vr': ['admin'],
    settings: ['admin'],
    permissions: ['admin'],
    cashbox: ['admin'],
    'cashbox-machines': ['admin'],
    gates: ['admin'],
    gate: ['admin'],
    zones: ['admin'],
    'teleport-ng': ['admin'],
    'ng-servers': ['admin'],
    'ng-controllers': ['admin'],
    'ng-games': ['admin'],
    'teleport-poly': ['admin'],
    'poly-servers': ['admin'],
    'poly-controllers': ['admin'],
    park: ['admin'],
    cards: ['admin'],
    games: ['admin'],
    visitors: ['admin'],
    packages: ['admin'],
    pricing: ['admin']
};
