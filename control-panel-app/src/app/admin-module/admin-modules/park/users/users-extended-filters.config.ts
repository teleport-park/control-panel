import { ExtendedFilterFieldGroup } from '../../../../common/extended-filters-module/extended-filters.component';
import { InitService } from '../../../../services/init.service';

export const UserExtendedFilterConfig: ExtendedFilterFieldGroup[] = [
    {
        property: 'age',
        label: 'USER_AGE',
        type: 'range',
        from: 1,
        to: 99,
        group: [
            {
                property: 'age_min', initialValue: null, validators: [{key: 'min', value: 1}]
            },
            {property: 'age_max', validators: [{key: 'max', value: 99}]}
        ],
    }, {
        property: 'genders[]',
        label: 'USER_GENDER_LABEL',
        type: 'check-box-group',
        options: [
            {value: 'male', label: 'MALE'},
            {value: 'female', label: 'FEMALE'}
        ]
    }, {
        property: 'registered',
        label: 'EXTENDED_FILTER_REGISTERED',
        type: 'date-period',
        group: [
            {property: 'reg_from'}, {property: 'reg_to'}
        ]
    }
];

export class ExtendedConfigBuilder {
    constructor(private initService: InitService) {
        const prop = UserExtendedFilterConfig[0].group[0];
        prop.initialValue = prop.validators[0].value = initService.config.visitor_min_age || 1;
    }

    get config() {
        return UserExtendedFilterConfig;
    }
}
