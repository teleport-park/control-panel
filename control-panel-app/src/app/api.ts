export const API: { [key: string]: string | any } = {
   // ready
   TVR_INSTANCES: 'tng/mgmt/servers',
   GAMES: 'cpanel/tp/games',
   VRGAMES: 'tng/mgmt/games',
   CARDS: 'cpanel/users/cards',
   // visitors
   VISITORS: 'cpanel/users/visitors',
   // staff
   STAFF: 'cpanel/users/staff',


   GATE_INSTANCES: 'gates/mgmt/instances',
   CASH_BOX_INSTANCES: 'cashbox/mgmt/instances',

   PACKAGES: 'cpanel/packages',
   PACKAGES_HISTORY: 'cpanel/packages/history',
   SESSIONS: 'cpanel/sessions',
   PRICES: 'cpanel/prices',
   // transactions
   TRANSACTIONS: 'cpanel/transactions',

   TRANSACTIONS_HISTORY: 'cpanel/transactions/history',


   // groups
   GROUPS: 'api/staffgroups',
   // permissions
   PERMISSIONS: 'api/permissions',
   // string search query params
   SEARCH: 'queryString',
   // paging params
   paging: {
      page: 'pageNumber',
      size: 'pageSize'
   },
   // sorting
   sorting: {
      column: 'orderByColumn',
      direction: 'orderDirection'
   }
};
