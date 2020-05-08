import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VrMachinesComponent } from './vr-machines/vr-machines.component';
import { VrGamesComponent } from './vr-games/vr-games.component';
import { TeleportVrComponent } from './teleport-vr.component';
import { RouterModule, Routes } from '@angular/router';
import { PermissionGuard } from '../../../common/auth-module/guards/permission-guard';
import { SharedModule } from '../../../common/shared-module/shared.module';
import { MaterialModule } from '../../../material.module';
import { TranslationModule } from '../../../common/translations-module/translation.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiUrlsService } from '../../../services/api-urls.service';
import { CommonInstanceService } from '../../../services';
import { TVRController } from '../../../models/controller';
import { INSTANCE_SERVICE } from '../../../models/intefaces';

const mockData = [
    {
        machine_token: '54fa7ec3-5555-4376-afba-e34d23fb7e7b',
        registered: false,
        connected: false,
        ip_address: '253.249.52.92',
        enabled: true,
        status: 'busy',
        display_name: 'Serious Sam VR The Last Hope',
        name: 'Fire Simulator',
        game: {
            id: '934098f8-1485-4bda-8d65-1a56052007c3',
            name: 'Munch'
        }
    },
    {
        machine_token: '4972e27b-fed2-4ff8-9b17-59b35d4461a3',
        registered: false,
        connected: false,
        ip_address: '41.179.245.93',
        enabled: true,
        status: 'busy',
        display_name: 'SmashBox Arena',
        name: 'Raw Data Arcade',
        game: {
            id: '639c3036-f9f0-4a49-96a1-576183577c16',
            name: 'Angry Birds VR'
        }
    },
    {
        machine_token: 'dab10c74-3d99-431f-8dff-d11fd0a9d787',
        registered: true,
        connected: true,
        ip_address: '167.194.81.172',
        enabled: false,
        status: 'busy',
        display_name: 'Job Simulator',
        name: 'Ural Repair',
        game: {
            id: '3511c320-bae8-40ca-ba7e-b86b559a5cf5',
            name: 'Sprint Vector'
        }
    },
    {
        machine_token: 'b978c17a-1a02-4675-af21-dda17f655e90',
        registered: false,
        connected: true,
        ip_address: '147.61.150.255',
        enabled: true,
        status: 'ready',
        display_name: 'Tutorial',
        name: 'SUPERHOT',
        game: {
            id: '8eaffe0f-e6fb-4690-a412-6f3b2e6fa389',
            name: 'GORN'
        }
    },
    {
        machine_token: '4f0e8a1b-1228-4d2c-a555-921a212cf6d9',
        registered: false,
        connected: false,
        ip_address: '26.253.181.157',
        enabled: true,
        status: 'busy',
        display_name: 'Electronauts Arcade',
        name: 'Racket Fury: Table Tennis VR',
        game: {
            id: '5351d043-7fff-4b01-9835-e06d8c78f46a',
            name: 'Angry Birds VR'
        }
    },
    {
        machine_token: '82fd7642-0249-43f9-b307-059836d4f867',
        registered: false,
        connected: true,
        ip_address: '132.35.156.200',
        enabled: false,
        status: 'busy',
        display_name: 'RevolVR 2.0',
        name: 'Electronauts Arcade',
        game: {
            id: '6ec9606c-1aad-498d-b4d2-1f2a766a932f',
            name: 'BAAM SQUAD'
        }
    },
    {
        machine_token: '20bf33d3-99ea-44ba-a75f-f816ed412333',
        registered: true,
        connected: false,
        ip_address: '58.150.174.20',
        enabled: false,
        status: 'busy',
        display_name: 'GRP',
        name: 'Smeshariki',
        game: {
            id: 'b2e370b8-8219-4594-94b1-251a811ac61b',
            name: 'Jumanji: The VR Adventure'
        }
    },
    {
        machine_token: '53a813fc-56ad-4db7-914c-aae4a3213a14',
        registered: true,
        connected: false,
        ip_address: '191.165.193.78',
        enabled: false,
        status: 'ready',
        display_name: 'Waltz of the Wizard',
        name: 'SmashBox Arena',
        game: {
            id: 'f91a711a-1b73-48db-bd11-011818cabfc1',
            name: 'Engine'
        }
    },
    {
        machine_token: 'e5db4c21-0897-4c0f-9751-229d6d5ef74b',
        registered: false,
        connected: false,
        ip_address: '130.110.208.7',
        enabled: false,
        status: 'idle',
        display_name: 'Sprint Vector',
        name: 'Battle Force',
        game: {
            id: '2083c934-2a69-48fe-802c-3f1e9add383a',
            name: 'The Controller RUS'
        }
    },
    {
        machine_token: 'eb89a4a4-2bc9-4b0c-8964-f5611ea3f508',
        registered: true,
        connected: false,
        ip_address: '39.123.145.223',
        enabled: false,
        status: 'busy',
        display_name: 'Shooty Fruity VR Arcade',
        name: 'Smeshariki',
        game: {
            id: 'cd191ae8-7bde-4161-93c9-23de06a01304',
            name: 'Engine'
        }
    },
    {
        machine_token: '72cf733a-dbd8-4740-a17d-e4c32ef05e0b',
        registered: false,
        connected: true,
        ip_address: '174.73.123.31',
        enabled: true,
        status: 'idle',
        display_name: 'Fruit Ninja',
        name: 'Shishkin',
        game: {
            id: '33da7ae9-d9d2-4732-b481-32fca4522737',
            name: 'Sairento VR'
        }
    },
    {
        machine_token: '2918f3b1-ecf6-49aa-9a05-4204b780d50e',
        registered: false,
        connected: false,
        ip_address: '140.156.118.200',
        enabled: true,
        status: 'ready',
        display_name: 'Smeshariki',
        name: 'SmashBox Arena',
        game: {
            id: 'dc6a15cc-f7b0-4c10-a665-dd6cd4da5ccb',
            name: 'Engine'
        }
    },
    {
        machine_token: '1696b314-24e5-45ca-bf8f-dce7ac475759',
        registered: false,
        connected: false,
        ip_address: '224.21.120.126',
        enabled: true,
        status: 'ready',
        display_name: 'Train Driver',
        name: 'Job Simulator',
        game: {
            id: '2b09b56c-60d0-433e-a7f0-2de642702dd0',
            name: 'Sprint Vector'
        }
    },
    {
        machine_token: 'aaa9ccbd-294c-4c4e-bd08-5c3b3b6ab325',
        registered: false,
        connected: false,
        enabled: false,
        status: null,
        display_name: 'Job Simulator',
        name: 'Nature Treks VR',
    },
    {
        machine_token: '8f0ad849-dfa7-443b-a810-4a0c3bb3b60c',
        registered: true,
        connected: true,
        ip_address: '176.149.156.252',
        enabled: true,
        status: 'idle',
        display_name: 'Creed Rise to Glory Arcade',
        name: 'Pirates',
        game: {
            id: '0eac52e7-f7bf-450d-9e96-c18173bc50a1',
            name: 'BAAM SQUAD'
        }
    },
    {
        machine_token: 'c732d54c-d446-434e-9184-6c45569590c0',
        registered: false,
        connected: false,
        ip_address: '140.238.7.57',
        enabled: false,
        status: 'ready',
        display_name: 'Lost Frontier',
        name: 'Raw Data Arcade',
        game: {
            id: '1fefc6f1-5c21-4982-88dd-74e23021d2f6',
            name: 'GRP'
        }
    },
    {
        machine_token: 'e05e09a2-b78a-42c6-92c2-7eeb0625ebf9',
        registered: true,
        connected: true,
        ip_address: '52.245.204.100',
        enabled: false,
        status: 'ready',
        display_name: 'Tilt Brush',
        name: 'Train Driver',
        game: {
            id: 'acbbb789-6428-4edc-b131-026f57c19f20',
            name: 'GORN'
        }
    },
    {
        machine_token: '46324ce1-779a-47cf-bb39-5f27ae8e165c',
        registered: true,
        connected: true,
        ip_address: '118.225.177.47',
        enabled: false,
        status: 'idle',
        display_name: 'Racket:NX',
        name: 'BAAM SQUAD',
        game: {
            id: '97113ac8-7441-4f88-988d-2ae22b047f99',
            name: 'GRP'
        }
    }
];

const routes: Routes = [{
    path: '', component: TeleportVrComponent,
    children: [{
        path: '',
        redirectTo: 'vr-controllers',
        pathMatch: 'full'
    }, {
        path: 'vr-machines',
        component: VrMachinesComponent,
        data: {title: 'ADMIN_MENU_SERVERS'},
        canActivate: [PermissionGuard]
    }, {
        path: 'vr-games',
        component: VrGamesComponent,
        data: {title: 'ADMIN_MENU_GAMES'},
        canActivate: [PermissionGuard]
    }]
}];

export const TeleportNGRouterModule = RouterModule.forChild(routes);

export function VrMachinesFactory(http: HttpClient, apiUrlService: ApiUrlsService) {
    return new CommonInstanceService(http, apiUrlService.getTVRMachines, (item) => new TVRController(item));
}

@NgModule({
    declarations: [VrMachinesComponent, VrGamesComponent, TeleportVrComponent],
    imports: [
        CommonModule,
        TeleportNGRouterModule,
        SharedModule,
        MaterialModule,
        TranslationModule,
        ReactiveFormsModule
    ],
    providers: [
        {provide: INSTANCE_SERVICE, useFactory: VrMachinesFactory, deps: [HttpClient, ApiUrlsService]}
    ]
})
export class TeleportVrModule {
}
