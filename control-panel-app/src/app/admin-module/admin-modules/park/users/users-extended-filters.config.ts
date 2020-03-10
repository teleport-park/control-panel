import { ExtendedFilterFieldGroup } from '../../../../common/extended-filters-module/extended-filters.component';

export const UserExtendedFilterConfig: ExtendedFilterFieldGroup[] = [
  {
    property: 'age',
    label: 'USER_AGE',
    type: 'range',
    from: 1,
    to: 99,
    group: [
      {property: 'age_min'},
      {property: 'age_max'}
    ]
  }, {
    property: 'genders[]',
    label: 'USER_GENDER_LABEL',
    type: 'check-box-group',
    options: [
      {value: 'male', label: 'USER_GENDER_MALE'},
      {value: 'female', label: 'USER_GENDER_FEMALE'}
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
