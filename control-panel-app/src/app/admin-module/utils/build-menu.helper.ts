import { AuthService } from '../../common/auth-module/auth.service';
import { MenuPermissionMap } from '../../common/auth-module/guards/permission-map';

/**
 * menu item interface
 */
export interface MenuItem {
  icon: string;
  label: string;
  path: string;
  active: boolean;
  children?: MenuItem[];
}

export class BuildMenuHelper {

  /**
   * full menu
   */
  menu: MenuItem[] = [
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
      path: '',
      active: false,
      children: [{
        icon: 'computer',
        label: 'ADMIN_MENU_HARDWARE',
        path: '/admin/amusements/hardware',
        active: false
      }, {
        icon: 'videogame_asset',
        label: 'ADMIN_MENU_GAMES',
        path: '/admin/amusements/games',
        active: false
      }, {
        icon: 'euro_symbol',
        label: 'ADMIN_MENU_CASHBOX',
        path: '/admin/amusements/cashbox',
        active: false
      }, {
        icon: 'accessibility',
        label: 'ADMIN_MENU_GATES',
        path: '/admin/amusements/gates',
        active: false
      }]
    }, {
      icon: 'people',
      label: 'ADMIN_MENU_USER_MANAGEMENT',
      path: '/admin/user-management',
      active: false,
      children: [{
        icon: 'people',
        label: 'ADMIN_MENU_USERS',
        path: '/admin/user-management/users',
        active: false
      }, {
        icon: 'people_outline',
        label: 'ADMIN_MENU_STAFF',
        path: '/admin/user-management/staff',
        active: false,
      }, {
        icon: 'group_add',
        label: 'ADMIN_MENU_GROUPS',
        path: '/admin/user-management/staff/groups',
        active: false
      }, {
        icon: 'credit_card',
        label: 'ADMIN_MENU_CARDS',
        path: '/admin/user-management/cards',
        active: false
      }]
    }];

  /**
   * current user permission
   */
  userPermission: string;


  constructor(private authService: AuthService) {
    this.userPermission = authService.currentUserValue.permission;
  }

  /**
   * get menu
   */
  getMenu(): MenuItem[] {
    return this.prepareMenu(this.menu, this.userPermission);
  }

  /**
   * prepare menu recursively
   * @param menu
   * @param userPermission
   */
  private prepareMenu(menu: MenuItem[], userPermission: string) {
    return menu.filter((item: MenuItem) => {
      if (item.children) {
        item.children = this.prepareMenu(item.children, userPermission);
      }
      const path = item.path.split('/');
      const itemIdentifier = path[path.length - 1];
      const permission = MenuPermissionMap[itemIdentifier] as string[];
      return !permission.length || permission.indexOf(userPermission) > -1;
    });
  }
}
