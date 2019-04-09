export class ApiUrlBuilder {
  private _url = '';
  private _endPoint = '';

  constructor(endPoint: string) {
    this.setEndPoint(endPoint);
  }

  private setEndPoint(endpoint: string): void {
    this._endPoint = endpoint;
  }

  public appendQueryParameter(parameterName: string, parameterValue: string): ApiUrlBuilder {
    if (parameterName && parameterValue && !this._url.includes(parameterName)) {
      const queryChar = (!this._url || this._url === '') ? '?' : '&';
      this._url += `${queryChar}${parameterName}=${parameterValue}`;
    }
    return this;
  }

  public build(): string {
    return `${this._endPoint}/${this._url}`;
  }
}
