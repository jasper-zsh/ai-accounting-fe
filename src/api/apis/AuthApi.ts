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
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
} from '../models/index';
import {
    LoginRequestFromJSON,
    LoginRequestToJSON,
    LoginResponseFromJSON,
    LoginResponseToJSON,
    RegisterRequestFromJSON,
    RegisterRequestToJSON,
    UserFromJSON,
    UserToJSON,
} from '../models/index';

export interface LoginOperationRequest {
    loginRequest?: LoginRequest;
}

export interface RegisterOperationRequest {
    registerRequest?: RegisterRequest;
}

/**
 * AuthApi - interface
 * 
 * @export
 * @interface AuthApiInterface
 */
export interface AuthApiInterface {
    /**
     * 
     * @summary Login
     * @param {LoginRequest} [loginRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthApiInterface
     */
    loginRaw(requestParameters: LoginOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<LoginResponse>>;

    /**
     * 
     * Login
     */
    login(requestParameters: LoginOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<LoginResponse>;

    /**
     * 
     * @summary Logout
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthApiInterface
     */
    logoutRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<object>>;

    /**
     * 
     * Logout
     */
    logout(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<object>;

    /**
     * 
     * @summary Register
     * @param {RegisterRequest} [registerRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthApiInterface
     */
    registerRaw(requestParameters: RegisterOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<User>>;

    /**
     * 
     * Register
     */
    register(requestParameters: RegisterOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<User>;

}

/**
 * 
 */
export class AuthApi extends runtime.BaseAPI implements AuthApiInterface {

    /**
     * 
     * Login
     */
    async loginRaw(requestParameters: LoginOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<LoginResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/auth/login`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: LoginRequestToJSON(requestParameters.loginRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => LoginResponseFromJSON(jsonValue));
    }

    /**
     * 
     * Login
     */
    async login(requestParameters: LoginOperationRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<LoginResponse> {
        const response = await this.loginRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 
     * Logout
     */
    async logoutRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<object>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/auth/logout`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * 
     * Logout
     */
    async logout(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<object> {
        const response = await this.logoutRaw(initOverrides);
        return await response.value();
    }

    /**
     * 
     * Register
     */
    async registerRaw(requestParameters: RegisterOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<User>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/auth/register`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: RegisterRequestToJSON(requestParameters.registerRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserFromJSON(jsonValue));
    }

    /**
     * 
     * Register
     */
    async register(requestParameters: RegisterOperationRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<User> {
        const response = await this.registerRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
