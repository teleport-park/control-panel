// TODO refactor and move in config file
export interface PermissionMap {
   [key: string]: string[];
}

export const MenuPermissionMap: PermissionMap = {
   'vr-games': ['admin'],
   'vr-machines': ['admin'],
   'teleport-vr': ['admin'],
   settings: null,
   permissions: null,
   cashbox: ['admin'],
   'cashbox-machines': ['admin'],
   gates: ['admin'],
   gate: ['admin'],
   zones: ['admin'],
   'teleport-ng': null,
   'ng-servers': ['admin'],
   'ng-controllers': ['admin'],
   'ng-games': ['admin'],
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
