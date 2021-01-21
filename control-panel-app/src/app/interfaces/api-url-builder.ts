export interface IApiUrlBuilderInterface {
    appendQueryParameter(parameterName: string, parameterValue: string): IApiUrlBuilderInterface;
    appendUrl(parameterValue: string): IApiUrlBuilderInterface;
    build(): string;
    isRequestMethodGet(): boolean;
    isRequestMethodPost(): boolean;
    isRequestMethodPut(): boolean;
    isRequestMethodDelete(): boolean;
}
