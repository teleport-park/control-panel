import { AuthService } from '../../common/auth-module/auth.service';
import { MenuPermissionMap } from '../../common/auth-module/guards/permission-map';

export interface MenuItem {
  icon: string;
  label: string;
  path: string;
  active: boolean;
  children?: MenuItem[];
}


export class BuildMenuHelper {

  fullMenu: MenuItem[] = [
    {
      icon: 'dashboard',
      label: 'ADMIN_MENU_DASHBOARD',
      path: '/admin/dashboard',
      active: false
    }, {
      icon: 'settings',
      label: 'ADMIN_MENU_ADMINISTRATION',
      path: '/admin/administration',
      active: false,
      children: [
        {
          icon: 'code',
          label: 'GROUP_PERMISSIONS',
          path: '/admin/administration/permissions',
          active: false
        }
      ]
    }, {
      icon: 'monetization_on',
      label: 'ADMIN_MENU_BILLING',
      path: '/admin/billing',
      active: false,
      children: [{
        icon: 'games',
        label: 'ADMIN_MENU_GAMES_TARIFFS',
        path: '/admin/billing/games-tariffs',
        active: false
      }, {
        icon: 'money',
        label: 'ADMIN_MENU_INCOME_TARIFFS',
        path: '/admin/billing/income-tariffs',
        active: false
      }, {
        icon: 'compare_arrows',
        label: 'ADMIN_MENU_TRANSACTIONS',
        path: '/admin/billing/transactions',
        active: false
      }]
    }, {
      icon: 'videogame_asset',
      label: 'ADMIN_MENU_AMUSEMENT',
      path: '/admin/amusements',
      active: false,
      children: [{
        icon: 'computer',
        label: 'ADMIN_MENU_HARDWARE',
        path: '/admin/amusements/hardware',
        active: false
      } ]
    }, {
      icon: 'people',
      label: 'ADMIN_MENU_USERS',
      path: '/admin/users',
      active: false
    }, {
      icon: 'people_outline',
      label: 'ADMIN_MENU_STAFF',
      path: '/admin/staff',
      active: false,
      children: [
        {
          icon: 'group_add',
          label: 'ADMIN_MENU_GROUPS',
          path: '/admin/staff/groups',
          active: false
        }
      ]
    }, {
      icon: 'vpn_key',
      label: 'ADMIN_MENU_KEYCHAIN',
      path: '/admin/keychain',
      active: false,
      children: [{
        icon: 'credit_card',
        label: 'ADMIN_MENU_CARDS',
        path: '/admin/keychain/cards',
        active: false
      }]
    }
  ];

  userPermission: string;


  constructor(private authService: AuthService) {
    this.userPermission = authService.currentUserValue.permission;
  }

  getMenu(): MenuItem[] {
    return this.fullMenu.filter((item: MenuItem) => {
      if (item.children) {
        item.children = item.children.filter((childItem: MenuItem) => {
          const childPath = childItem.path.split('/');
          const childIdentifier = childPath[childPath.length - 1];
          const childPermission = MenuPermissionMap[childIdentifier] as string[];
          return !childPermission.length || childPermission.indexOf(this.userPermission) > -1;
        });
      }
      const path = item.path.split('/');
      const itemIdentifier = path[path.length - 1];
      const permission = MenuPermissionMap[itemIdentifier] as string[];
      return !permission.length || permission.indexOf(this.userPermission) > -1;
    });
  }

}
