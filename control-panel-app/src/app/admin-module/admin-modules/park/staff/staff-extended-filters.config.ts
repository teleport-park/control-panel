import { ExtendedFilterFieldGroup } from '../../../../common/extended-filters-module/extended-filters.component';

export const StaffExtendedFiltersConfig: ExtendedFilterFieldGroup[] = [
    // {
    //   property: 'state',
    //   label: 'EXTENDED_FILTER_STAFF_STATE',
    //   type: 'check-box-group',
    //   options: [
    //     {value: 'activated', label: 'EXTENDED_FILTER_STAFF_ACTIVE'},
    //     {value: 'deactivated', label: 'EXTENDED_FILTER_STAFF_NOT_ACTIVE'}
    //   ]
    // }, {
    //   property: 'hiredDate',
    //   label: 'STAFF_EMPLOYMENT_DATE',
    //   type: 'date-period',
    //   group: [
    //     {property: 'hiredFrom'}, {property: 'hiredTo'}
    //   ]
    // }, {
    //   property: 'firedDate',
    //   label: 'STAFF_FIRED_DATE',
    //   type: 'date-period',
    //   group: [
    //     {property: 'firedFrom'}, {property: 'firedTo'}
    //   ]
    // }, {
    //   property: 'group',
    //   label: 'GROUP',
    //   type: 'select',
    //   options: []
    // }
    // {
    //     property: 'role',
    //     label: 'STAFF_ROLES',
    //     type: 'radio-button-group',
    //     options: [
    //         {value: 'super', label: 'super'},
    //         {value: 'admin', label: 'admin'},
    //         {value: 'cashier', label: 'cashier'},
    //         {value: 'operator', label: 'operator'},
    //     ]
    // },
    {
      property: 'roles[]',
      label: 'STAFF_ROLES',
      type: 'check-box-group',
      options: [
          {value: 'admin', label: 'admin'},
          {value: 'cashier', label: 'cashier'},
          {value: 'operator', label: 'operator'},
      ]
    },
    // {
    //     property: 'state',
    //     label: 'STAFF_STATE',
    //     type: 'check-box-group',
    //     options: [
    //         {value: 'hired', label: 'STAFF_HIRED'},
    //         {value: 'fired', label: 'STAFF_FIRED'}
    //     ]
    // }
];
