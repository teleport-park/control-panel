export const API: {[key: string]: string | any} = {
  // users
  USERS: 'api/users/',
  // staff
  STAFF: 'api/staff',
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
  // filter param
  search: {
    users: 'findUsers/',
    total: 'totalPages/'
  },
  // sorting
  sorting: {
    column: 'orderByColumn',
    direction: 'orderDirection'
  }
};
