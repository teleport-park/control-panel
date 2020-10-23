export const API = {
    // TNG section

    TNG_INSTANCES: 'tng/mgmt/servers',
    TNG_GAMES: 'tng/mgmt/games',
    TNG_CONTROLLERS: 'tng/mgmt/controllers',

    // TVR section

    TVR_MACHINES: 'tvr/mgmt/machines',
    TVR_GAMES: 'tvr/mgmt/games',

    // Cash box section

    CASH_BOX_INSTANCES: 'cashbox/mgmt/machines',


    GAMES: 'cpanel/prices',
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

    // Packages
    PACKAGES: 'cpanel/packages',
    PROMO: 'cpanel/promos',

    GATE_INSTANCES: 'gates/mgmt/instances',

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
    },

    WHO_IS: 'tng/ctl/whois'
};
