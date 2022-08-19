/**
 * React url's:
 * 
 *  /records/lists/
 *  /records/detail/
 *  /records/detail/<id>/
 * 
 * API url's:
 * 
 *  /records/
 *  /records/<record_id>/
 *  /records/<record_id>/entries/
 *  /records/<record_id>/entries/<entry_id>/
 * 
 */

import UrlBuilder from "rest-api-url-builder";

export const API_BASE_URL = new URL('api', process.env.REACT_APP_API_BASE_URL);

export const API_ENDPOINTS = {
    RECORD_LISTS: 'record_lists',
    RECORD_DETAIL: 'record_detail',
    FIELD_LISTS: 'field_lists', 
    FIELD_DETAIL: 'field_detail', 
    ENTRY_LISTS: 'entry_lists',
    ENTRY_DETAIL: 'entry_detail',
}

export const ROUTER_PAGE_ENDPOINTS = {
    RECORD_LISTS_PAGE: 'record_lists_page',
    RECORD_DETAIL_PAGE: 'record_detail_page',
    CREATE_RECORD_PAGE: 'create_record_page',
    ENTRY_LISTS_PAGE: 'entry_lists_page',
    ENTRY_DETAIL_PAGE: 'entry_detail_page',
    CREATE_ENTRY_PAGE: 'create_entry_page',
    LOGIN_PAGE: 'login_page',
}

export const apiURLBuilder = new UrlBuilder({
    [API_ENDPOINTS.RECORD_LISTS]: '/records/',
    [API_ENDPOINTS.RECORD_DETAIL]: '/records/:record_id/',
    [API_ENDPOINTS.FIELD_LISTS]: '/records/:record_id/fields/',
    [API_ENDPOINTS.FIELD_DETAIL]: '/records/:record_id/fields/:field_id/',
    [API_ENDPOINTS.ENTRY_LISTS]: '/records/:record_id/entries/',
    [API_ENDPOINTS.ENTRY_DETAIL]: '/records/:record_id/entries/:entry_id/',
}, {
    baseURL: API_BASE_URL.href,
});

export const routePageUrlBuilder = new UrlBuilder({
    [ROUTER_PAGE_ENDPOINTS.RECORD_LISTS_PAGE]: '/records/lists/',
    [ROUTER_PAGE_ENDPOINTS.CREATE_RECORD_PAGE]: '/records/detail/',
    [ROUTER_PAGE_ENDPOINTS.RECORD_DETAIL_PAGE]: '/records/detail/:record_id/',
    [ROUTER_PAGE_ENDPOINTS.ENTRY_LISTS_PAGE]: '/records/detail/:record_id/entries/lists/',
    [ROUTER_PAGE_ENDPOINTS.ENTRY_DETAIL_PAGE]: '/records/detail/:record_id/entries/detail/:entry_id/',
    [ROUTER_PAGE_ENDPOINTS.CREATE_ENTRY_PAGE]: '/records/detail/:record_id/entries/detail/',
    [ROUTER_PAGE_ENDPOINTS.LOGIN_PAGE]: '/login/',
}, { baseURL: '/' });

export function getBuildUrlByEndPoints(urlBuilder, endpoint, namedParams={}){
    if(!(urlBuilder instanceof UrlBuilder))
        throw new Error('urlBuilder is not instance of UrlBuilder');

    let url = urlBuilder.build(endpoint);

    Object.keys(namedParams).forEach((k) => {
        url = url.setNamedParameter(k, namedParams[k]);
    });

    return url.get();
}