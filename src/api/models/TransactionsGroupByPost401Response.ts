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
 * @interface TransactionsGroupByPost401Response
 */
export interface TransactionsGroupByPost401Response {
    /**
     * 
     * @type {string}
     * @memberof TransactionsGroupByPost401Response
     */
    message: string;
    /**
     * 
     * @type {number}
     * @memberof TransactionsGroupByPost401Response
     */
    statusCode: number;
}

/**
 * Check if a given object implements the TransactionsGroupByPost401Response interface.
 */
export function instanceOfTransactionsGroupByPost401Response(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "message" in value;
    isInstance = isInstance && "statusCode" in value;

    return isInstance;
}

export function TransactionsGroupByPost401ResponseFromJSON(json: any): TransactionsGroupByPost401Response {
    return TransactionsGroupByPost401ResponseFromJSONTyped(json, false);
}

export function TransactionsGroupByPost401ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): TransactionsGroupByPost401Response {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'message': json['message'],
        'statusCode': json['statusCode'],
    };
}

export function TransactionsGroupByPost401ResponseToJSON(value?: TransactionsGroupByPost401Response | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'message': value.message,
        'statusCode': value.statusCode,
    };
}
