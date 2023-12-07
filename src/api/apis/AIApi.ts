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
import type {
  AiCommandPostRequest,
  AiVoicePostRequest,
  Transaction,
} from '../models/index';
import {
    AiCommandPostRequestFromJSON,
    AiCommandPostRequestToJSON,
    AiVoicePostRequestFromJSON,
    AiVoicePostRequestToJSON,
    TransactionFromJSON,
    TransactionToJSON,
} from '../models/index';

export interface AiCommandPostOperationRequest {
    aiCommandPostRequest?: AiCommandPostRequest;
}

export interface AiVoicePostOperationRequest {
    aiVoicePostRequest?: AiVoicePostRequest;
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
     * @param {AiCommandPostRequest} [aiCommandPostRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AIApiInterface
     */
    aiCommandPostRaw(requestParameters: AiCommandPostOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Transaction>>;

    /**
     * 
     * AI Command
     */
    aiCommandPost(requestParameters: AiCommandPostOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Transaction>;

    /**
     * 
     * @summary AI Voice
     * @param {AiVoicePostRequest} [aiVoicePostRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AIApiInterface
     */
    aiVoicePostRaw(requestParameters: AiVoicePostOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Transaction>>;

    /**
     * 
     * AI Voice
     */
    aiVoicePost(requestParameters: AiVoicePostOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Transaction>;

}

/**
 * 
 */
export class AIApi extends runtime.BaseAPI implements AIApiInterface {

    /**
     * 
     * AI Command
     */
    async aiCommandPostRaw(requestParameters: AiCommandPostOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Transaction>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/ai/command`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: AiCommandPostRequestToJSON(requestParameters.aiCommandPostRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TransactionFromJSON(jsonValue));
    }

    /**
     * 
     * AI Command
     */
    async aiCommandPost(requestParameters: AiCommandPostOperationRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Transaction> {
        const response = await this.aiCommandPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 
     * AI Voice
     */
    async aiVoicePostRaw(requestParameters: AiVoicePostOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Transaction>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/ai/voice`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: AiVoicePostRequestToJSON(requestParameters.aiVoicePostRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TransactionFromJSON(jsonValue));
    }

    /**
     * 
     * AI Voice
     */
    async aiVoicePost(requestParameters: AiVoicePostOperationRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Transaction> {
        const response = await this.aiVoicePostRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
