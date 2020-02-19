import { IApiUrlBuilderInterface } from '../interfaces/api-url-builder';

export class ApiUrlBuilder implements IApiUrlBuilderInterface {
   private _url = '';
   private _endPoint = '';
   private _requestMethod = '';

   constructor(endPoint: string, requestMethod: string = 'GET') {
      this.setEndPoint(endPoint);
      this.setRequestMethod(requestMethod);
   }

   public isRequestMethodGet(): boolean {
      return this._requestMethod === 'GET';
   }

   public isRequestMethodPost(): boolean {
      return this._requestMethod === 'POST';
   }

   public isRequestMethodPatch(): boolean {
      return this._requestMethod === 'PATCH';
   }

   public isRequestMethodPut(): boolean {
      return this._requestMethod === 'PUT';
   }

   public isRequestMethodDelete(): boolean {
      return this._requestMethod === 'DELETE';
   }

   private setEndPoint(endpoint: string): void {
      this._endPoint = endpoint;
   }

   public setRequestMethod(requestMethod: string): void {
      this._requestMethod = requestMethod;
   }

   public appendQueryParameter(parameterName: string, parameterValue: string): ApiUrlBuilder {
      if (parameterName && parameterValue && !this._url.includes(parameterName)) {
         const queryChar = (!this._url || this._url === '') ? '?' : '&';
         this._url += `${queryChar}${parameterName}=${parameterValue}`;
      }
      return this;
   }

   public appendUrl(parameterValue: string): ApiUrlBuilder {
      if (parameterValue) {
         const urlSeparator = this._url !== '' && !this._url.endsWith('/') ? '/' : '';
         this._url += `${urlSeparator}${parameterValue}`;
      }
      return this;
   }

   public addQueryParams(params: string) {
      this._url += !this._url.endsWith('?') ? '&' + params : '' + params;
      return this;
   }

   public build(): string {
      return `${this._endPoint}/${this._url}`;
   }
}
