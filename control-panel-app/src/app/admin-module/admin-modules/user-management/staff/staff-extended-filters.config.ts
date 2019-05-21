import { ExtendedFilterFieldGroup } from '../../../../common/extended-filters-module/extended-filters.component';

export const StaffExtendedFiltersConfig: ExtendedFilterFieldGroup[] = [
  {
    property: 'state',
    label: 'EXTENDED_FILTER_STAFF_STATE',
    type: 'check-box-group',
    options: [
      {value: 'activated', label: 'EXTENDED_FILTER_STAFF_ACTIVE'},
      {value: 'deactivated', label: 'EXTENDED_FILTER_STAFF_NOT_ACTIVE'}
    ]
  }, {
    property: 'hiredDate',
    label: 'STAFF_EMPLOYMENT_DATE',
    type: 'date-period',
    group: [
      {property: 'hiredFrom'}, {property: 'hiredTo'}
    ]
  }, {
    property: 'firedDate',
    label: 'STAFF_FIRED_DATE',
    type: 'date-period',
    group: [
      {property: 'firedFrom'}, {property: 'firedTo'}
    ]
  }, {
    property: 'group',
    label: 'GROUP',
    type: 'select',
    options: []
  }
];
