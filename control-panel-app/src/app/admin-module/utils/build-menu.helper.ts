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
    ready?: boolean;
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
            label: 'ADMIN_MENU_PARK',
            path: '/admin/park',
            active: false,
            root: true,
            children: [{
                icon: 'people',
                label: 'ADMIN_MENU_USERS',
                path: '/admin/park/visitors',
                active: false,
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
                active: false,
            }, {
                icon: 'local_offer',
                label: 'ADMIN_MENU_PROMO',
                path: '/admin/park/promo',
                active: false,
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
                active: false,
                children: [
                    {
                        icon: '',
                        label: 'ADMIN_MENU_TRANSACTIONS',
                        path: '/admin/park/billing/transactions',
                        active: false
                    },
                    {
                        icon: '',
                        label: 'ADMIN_MENU_INVOICES',
                        path: '/admin/park/billing/invoices',
                        active: false
                    },
                    {
                        icon: '',
                        label: 'ADMIN_MENU_ACCOUNTS',
                        path: '/admin/park/billing/accounts',
                        active: false
                    }
                ]

            }]
        },
        {
            icon: 'memory',
            label: 'ADMIN_MENU_TELEPORT_NG',
            path: '/admin/teleport-ng',
            active: false,
            root: true,
            children: [
                {
                    icon: 'developer_board',
                    label: 'ADMIN_MENU_CONTROLLERS',
                    path: '/admin/teleport-ng/ng-controllers',
                    active: false
                }, {
                    icon: 'router',
                    label: 'ADMIN_MENU_SERVERS',
                    path: '/admin/teleport-ng/ng-servers',
                    active: false
                }, {
                    icon: 'videogame_asset',
                    label: 'ADMIN_MENU_GAMES',
                    path: '/admin/teleport-ng/ng-games',
                    active: false
                }]
        },
        {
            icon: 'memory',
            label: 'ADMIN_MENU_TELEPORT_VR',
            path: '/admin/teleport-vr',
            active: false,
            root: true,
            children: [
                {
                    icon: 'computer',
                    label: 'ADMIN_MENU_MACHINES',
                    path: '/admin/teleport-vr/vr-machines',
                    active: false
                }, {
                    icon: 'videogame_asset',
                    label: 'ADMIN_MENU_GAMES',
                    path: '/admin/teleport-vr/vr-games',
                    active: false
                }]
        }, {
            icon: 'markunread_mailbox',
            label: 'ADMIN_MENU_CASHBOX',
            path: '/admin/cashbox',
            active: false,
            root: true,
            children: [{
                icon: 'computer',
                label: 'ADMIN_MENU_MACHINES',
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
                label: 'ADMIN_MENU_GATES',
                path: '/admin/gate/gates',
                active: false
            }, {
                icon: 'zoom_out_map',
                label: 'ADMIN_MENU_ZONES',
                path: '/admin/gate/zones',
                active: false
            }]
        },
        {
            icon: 'memory',
            label: 'ADMIN_MENU_TELEPORT_POLY',
            path: '/admin/teleport-poly',
            active: false,
            root: true,
            children: [{
                icon: 'router',
                label: 'ADMIN_MENU_SERVERS',
                path: '/admin/teleport-poly/poly-servers',
                active: false
            }, {
                icon: 'developer_board',
                label: 'ADMIN_MENU_CONTROLLERS',
                path: '/admin/teleport-poly/poly-controllers',
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
