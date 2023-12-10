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

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface CreateAccountRequest
 */
export interface CreateAccountRequest {
    /**
     * 
     * @type {string}
     * @memberof CreateAccountRequest
     */
    name: string;
}

/**
 * Check if a given object implements the CreateAccountRequest interface.
 */
export function instanceOfCreateAccountRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "name" in value;

    return isInstance;
}

export function CreateAccountRequestFromJSON(json: any): CreateAccountRequest {
    return CreateAccountRequestFromJSONTyped(json, false);
}

export function CreateAccountRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateAccountRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': json['name'],
    };
}

export function CreateAccountRequestToJSON(value?: CreateAccountRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
    };
}
