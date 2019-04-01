export const API: {[key: string]: any} = {
  // users
  USERS: 'api/users/',
  // staff
  STAFF: 'api/staff',
  // groups
  GROUPS: 'api/staffgroups',
  // permissions
  PERMISSIONS: 'api/permissions',
  // paging params
  paging: {
    page: 'pageNumber',
    size: 'pageSize'
  },
  // filter param
  search: {
    users: 'findUsers/',
    query: 'queryString',
    total: 'totalPages/'
  },
  // sorting
  sorting: {
    column: 'orderByColumn',
    direction: 'orderDirection'
  }
};
