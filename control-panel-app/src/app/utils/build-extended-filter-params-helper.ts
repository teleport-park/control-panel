import moment, { Moment } from 'moment';
import { ExtendedFilterUrlParamsInterface } from '../interfaces/extended-filter-url-params.interface';

export class BuildExtendedFilterParamsHelper implements ExtendedFilterUrlParamsInterface {
  /**
   * @inheritDoc
   */
  getExtendedFilterParams(params: any): string {
    const paramsArray = [];
    Object.keys(params).forEach(key => {
      if (params[key]) {
        if (moment.isMoment(params[key])) {
          const data = params[key] as Moment;
          paramsArray.push(`${key}=${data.format('YYYY-MM-DD')}`);
          return;
        }
        paramsArray.push(`${key}=${params[key]}`);
      }
    });
    return paramsArray.join('&');
  }
}
