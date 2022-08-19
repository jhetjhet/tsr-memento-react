import fetch from "..";
import {
    API_ENDPOINTS,
    apiURLBuilder,
    getBuildUrlByEndPoints,
} from "../../constants/urls";

const create = (record_id, data) => {
    const url = getBuildUrlByEndPoints(apiURLBuilder, API_ENDPOINTS.ENTRY_LISTS, {
        record_id,
    });

    return fetch('post', url, {
        data,
    });
}

const lists = (record_id) => {
    const url = getBuildUrlByEndPoints(apiURLBuilder, API_ENDPOINTS.ENTRY_LISTS, {
        record_id,
    });
    
    return fetch('get', url);
}

const retrieve = (record_id, entry_id) => {
    const url = getBuildUrlByEndPoints(apiURLBuilder, API_ENDPOINTS.ENTRY_DETAIL, {
        record_id,
        entry_id,
    });
    
    return fetch('get', url);
}

const update = (record_id, entry_id, data) => {
    const url = getBuildUrlByEndPoints(apiURLBuilder, API_ENDPOINTS.ENTRY_DETAIL, {
        record_id,
        entry_id,
    });

    return fetch('put', url, {
        data,
    });
}

const _delete = (record_id, entry_id) => {
    const url = getBuildUrlByEndPoints(apiURLBuilder, API_ENDPOINTS.ENTRY_DETAIL, {
        record_id,
        entry_id,
    });

    return fetch('delete', url);
}

const recordEntryFetch = {
    create,
    lists,
    retrieve,
    update,
    delete: _delete,
};

export default recordEntryFetch;