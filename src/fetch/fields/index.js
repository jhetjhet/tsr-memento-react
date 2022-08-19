import fetch from "..";
import {
    API_ENDPOINTS,
    apiURLBuilder,
    getBuildUrlByEndPoints,
} from "../../constants/urls";

const create = (record_id, data) => {
    const url = getBuildUrlByEndPoints(apiURLBuilder, API_ENDPOINTS.FIELD_LISTS, {
        record_id,
    });

    return fetch('post', url, {
        data,
    });
}

const lists = (record_id) => {
    const url = getBuildUrlByEndPoints(apiURLBuilder, API_ENDPOINTS.FIELD_LISTS, {
        record_id,
    });
    
    return fetch('get', url);
}

const retrieve = (record_id, field_id) => {
    const url = getBuildUrlByEndPoints(apiURLBuilder, API_ENDPOINTS.FIELD_DETAIL, {
        record_id,
        field_id,
    });
    
    return fetch('get', url);
}

const update = (record_id, field_id, data) => {
    const url = getBuildUrlByEndPoints(apiURLBuilder, API_ENDPOINTS.FIELD_DETAIL, {
        record_id,
        field_id,
    });

    return fetch('put', url, {
        data,
    });
}

const _delete = (record_id, field_id) => {
    const url = getBuildUrlByEndPoints(apiURLBuilder, API_ENDPOINTS.FIELD_DETAIL, {
        record_id,
        field_id,
    });

    return fetch('delete', url);
}

const recordFieldsFetch = {
    create,
    lists,
    retrieve,
    update,
    delete: _delete,
};

export default recordFieldsFetch;