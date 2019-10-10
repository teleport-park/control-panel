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
    root?: boolean;
    children?: MenuItem[];
}

export class BuildMenuHelper {

    /**
     * full menu
     */
    menu: MenuItem[] = [
        //  new sections
        {
            icon: 'local_parking',
            path: '/admin/park',
            label: 'ADMIN_MENU_PARK',
            active: false,
            root: true,
            children: [{
                icon: 'people',
                label: 'ADMIN_MENU_USERS',
                path: '/admin/park/visitors',
                active: false
            }, {
                icon: 'people_outline',
                label: 'ADMIN_MENU_STAFF',
                path: '/admin/park/staff',
                active: false,
            }, {
                icon: 'credit_card',
                label: 'ADMIN_MENU_CARDS',
                path: '/admin/park/cards',
                active: false
            }, {
                icon: 'list',
                label: 'ADMIN_MENU_PACKAGES',
                path: '/admin/park/packages',
                active: false
            }, {
                icon: 'videogame_asset',
                label: 'ADMIN_MENU_GAMES',
                path: '/admin/park/games',
                active: false
            }, {
                icon: 'local_atm',
                label: 'ADMIN_MENU_PRICING',
                path: '/admin/park/pricing',
                active: false
            }, {
                icon: 'hourglass_empty',
                label: 'ADMIN_MENU_SESSIONS',
                path: '/admin/park/sessions',
                active: false
            }, {
                icon: 'monetization_on',
                label: 'ADMIN_MENU_BILLING',
                path: '/admin/park/billing',
                active: false
            }]
        },
        {
            icon: 'memory',
            label: 'ADMIN_MENU_TELEPORT_VR',
            path: '/admin/teleport-vr',
            active: false,
            root: true,
            children: [{
                icon: 'computer',
                path: '/admin/teleport-vr/vr-machines',
                label: 'ADMIN_MENU_MACHINES',
                active: false
            }, {
                icon: 'videogame_asset',
                path: '/admin/teleport-vr/vr-games',
                label: 'ADMIN_MENU_GAMES',
                active: false
            }]
        }, {
            icon: 'memory',
            path: '/admin/teleport-ng',
            label: 'ADMIN_MENU_TELEPORT_NG',
            active: false,
            root: true,
            children: [{
                icon: 'developer_board',
                path: '/admin/teleport-ng/ng-controllers',
                label: 'ADMIN_MENU_CONTROLLERS',
                active: false
            }, {
                icon: 'router',
                path: '/admin/teleport-ng/ng-servers',
                label: 'ADMIN_MENU_SERVERS',
                active: false
            }, {
                icon: 'videogame_asset',
                path: '/admin/teleport-ng/ng-games',
                label: 'ADMIN_MENU_GAMES',
                active: false
            }]
        }, {
            icon: 'memory',
            path: '/admin/teleport-poly',
            label: 'ADMIN_MENU_TELEPORT_POLY',
            active: false,
            root: true,
            children: [{
                icon: 'router',
                path: '/admin/teleport-poly/poly-servers',
                label: 'ADMIN_MENU_SERVERS',
                active: false
            }, {
                icon: 'developer_board',
                path: '/admin/teleport-poly/poly-controllers',
                label: 'ADMIN_MENU_CONTROLLERS',
                active: false
            }]
        }, {
            icon: 'markunread_mailbox',
            label: 'ADMIN_MENU_CASHBOX',
            path: '/admin/cashbox',
            active: false,
            root: true,
            children: [{
                icon: 'monetization_on',
                label: 'ADMIN_MENU_CASHBOX',
                path: '/admin/cashbox/cashbox-machines',
                active: false,
            }]
        }, {
            icon: 'accessibility',
            label: 'ADMIN_MENU_GATES',
            path: '/admin/gate',
            active: false,
            root: true,
            children: [{
                icon: 'exit_to_app',
                path: '/admin/gate/gates',
                label: 'ADMIN_MENU_GATES',
                active: false
            }, {
                icon: 'zoom_out_map',
                path: '/admin/gate/zones',
                label: 'ADMIN_MENU_ZONES',
                active: false
            }]
        }, {
            icon: 'settings',
            label: 'ADMIN_MENU_SETTINGS',
            path: '/admin/settings',
            active: false,
            root: true,
            children: [
                {
                    icon: 'code',
                    label: 'GROUP_PERMISSIONS',
                    path: '/admin/settings/permissions',
                    active: false
                }
            ]
        }
        // old sections
        // {
        //     icon: 'dashboard',
        //     label: 'ADMIN_MENU_DASHBOARD',
        //     path: '/admin/dashboard',
        //     active: false
        // },
        // {
        //     icon: 'monetization_on',
        //     label: 'ADMIN_MENU_BILLING',
        //     path: '/admin/billing',
        //     active: false,
        //     children: [{
        //         icon: 'games',
        //         label: 'ADMIN_MENU_GAMES_TARIFFS',
        //         path: '/admin/billing/games-tariffs',
        //         active: false
        //     }, {
        //         icon: 'money',
        //         label: 'ADMIN_MENU_INCOME_TARIFFS',
        //         path: '/admin/billing/income-tariffs',
        //         active: false
        //     }, {
        //         icon: 'compare_arrows',
        //         label: 'ADMIN_MENU_TRANSACTIONS',
        //         path: '/admin/billing/transactions',
        //         active: false
        //     }]
        // },
        // {
        //     icon: 'videogame_asset',
        //     label: 'ADMIN_MENU_AMUSEMENT',
        //     path: 'amusements',
        //     active: false,
        //     children: [{
        //         icon: 'computer',
        //         label: 'ADMIN_MENU_HARDWARE',
        //         path: '/admin/amusements/hardware',
        //         active: false
        //     }, {
        //         icon: 'videogame_asset',
        //         label: 'ADMIN_MENU_GAMES',
        //         path: '/admin/amusements/games',
        //         active: false
        //     },  {
        //         icon: 'accessibility',
        //         label: 'ADMIN_MENU_GATES',
        //         path: '/admin/amusements/gates',
        //         active: false
        //     }]
        // }, {
        //     icon: 'people',
        //     label: 'ADMIN_MENU_USER_MANAGEMENT',
        //     path: '/admin/user-management',
        //     active: false,
        //     children: [{
        //         icon: 'people',
        //         label: 'ADMIN_MENU_USERS',
        //         path: '/admin/user-management/users',
        //         active: false
        //     }, {
        //         icon: 'people_outline',
        //         label: 'ADMIN_MENU_STAFF',
        //         path: '/admin/user-management/staff',
        //         active: false,
        //     }, {
        //         icon: 'group_add',
        //         label: 'ADMIN_MENU_GROUPS',
        //         path: '/admin/user-management/staff/groups',
        //         active: false
        //     }, {
        //         icon: 'credit_card',
        //         label: 'ADMIN_MENU_CARDS',
        //         path: '/admin/user-management/cards',
        //         active: false
        //     }]
        // },
    ];

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
            return permission && (permission.length && permission.indexOf(userPermission) > -1);
        });
    }
}
