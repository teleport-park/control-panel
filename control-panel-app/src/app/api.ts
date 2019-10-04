export const API: {[key: string]: string | any} = {
  TVR_INSTANCES: 'tvr/mgmt/instances',
  GATE_INSTANCES: 'gates/mgmt/instances',
  CASH_BOX_INSTANCES: 'cashbox/mgmt/instances',

  PACKAGES: 'cpanel/packages',
  PACKAGES_HISTORY: 'cpanel/packages/history',
  // users
  USERS: 'api/users/',
  // staff
  STAFF: 'api/staff/',
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
