export const API = {
    // TNG section

    TNG_INSTANCES: 'tng/mgmt/servers',
    TNG_GAMES: 'tng/mgmt/games',
    TNG_CONTROLLERS: 'tng/mgmt/controllers',

    // TVR section

    TVR_MACHINES: 'tvr/mgmt/machines',
    TVR_GAMES: 'tvr/mgmt/games',

    // Cash box section

    CASH_BOX_INSTANCES: 'tvr/mgmt/cashbox',


    GAMES: 'cpanel/games',
    CARDS: 'cpanel/users/cards',
    // visitors
    VISITORS: 'cpanel/users/visitors',
    // staff
    STAFF: 'cpanel/users/staff',
    // sessions
    SESSIONS: 'cpanel/sessions',
    // Billing
    BILLING_ACCOUNTS: 'cpanel/billing/accounts',
    BILLING_INVOICES: 'cpanel/billing/invoices',
    BILLING_TRANSACTIONS: 'cpanel/billing/transactions',


    GATE_INSTANCES: 'gates/mgmt/instances',
    PACKAGES: 'cpanel/packages',
    PACKAGES_HISTORY: 'cpanel/packages/history',
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
