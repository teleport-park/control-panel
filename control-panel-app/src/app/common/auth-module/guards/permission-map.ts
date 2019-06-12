// TODO refactor and move in config file
export const MenuPermissionMap = {
  // dashboard section
  dashboard: null,
  // administration section
  administration: null,
  permissions: null,
  // billing section
  billing: null,
  'games-tariffs': null,
  'income-tariffs': null,
  transactions: null,
  // amusements
  amusements: ['admin'],
  hardware: ['admin'],
  'hardware/:id': ['admin'],
  cashbox: ['admin'],
  'cashbox/:id': ['admin'],
  gates: ['admin'],
  'gates/:id': ['admin'],
  games: ['admin'],
  // users-managements
  users: null,
  'users/:id': null,
  'staff/:id': null,
  staff: null,
  groups: null,
  keychain: null,
  cards: null,
  'user-management': null
};
