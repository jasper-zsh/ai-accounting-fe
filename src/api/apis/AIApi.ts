/* tslint:disable */
/* eslint-disable */
/**
 * AI Accounting
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';

export interface AiCommandPostRequest {
    body?: object;
}

/**
 * AIApi - interface
 * 
 * @export
 * @interface AIApiInterface
 */
export interface AIApiInterface {
    /**
     * 
     * @summary AI Command
     * @param {object} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AIApiInterface
     */
    aiCommandPostRaw(requestParameters: AiCommandPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<object>>;

    /**
     * 
     * AI Command
     */
    aiCommandPost(requestParameters: AiCommandPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<object>;

}

/**
 * 
 */
export class AIApi extends runtime.BaseAPI implements AIApiInterface {

    /**
     * 
     * AI Command
     */
    async aiCommandPostRaw(requestParameters: AiCommandPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<object>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/ai/command`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.body as any,
        }, initOverrides);

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * 
     * AI Command
     */
    async aiCommandPost(requestParameters: AiCommandPostRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<object> {
        const response = await this.aiCommandPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

}