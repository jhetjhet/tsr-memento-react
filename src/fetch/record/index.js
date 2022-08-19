import fetch from "..";
import {
    API_ENDPOINTS,
    apiURLBuilder,
    getBuildUrlByEndPoints,
} from "../../constants/urls";

const create = (data) => {
    const url = getBuildUrlByEndPoints(apiURLBuilder, API_ENDPOINTS.RECORD_LISTS);

    return fetch('post', url, {
        data,
    });
}

const lists = () => {
    const url = getBuildUrlByEndPoints(apiURLBuilder, API_ENDPOINTS.RECORD_LISTS);

    return fetch('get', url);
}

const retrieve = (id) => {
    const url = getBuildUrlByEndPoints(apiURLBuilder, API_ENDPOINTS.RECORD_DETAIL, {
        record_id: id,
    });
    
    return fetch('get', url);
}

const update = (id, data) => {
    const url = getBuildUrlByEndPoints(apiURLBuilder, API_ENDPOINTS.RECORD_DETAIL, {
        record_id: id,
    });

    return fetch('put', url, {
        data,
    });
}

const _delete = (id) => {
    const url = getBuildUrlByEndPoints(apiURLBuilder, API_ENDPOINTS.RECORD_DETAIL, {
        record_id: id,
    });

    return fetch('delete', url);
}

const recordFetch = {
    create,
    lists,
    retrieve,
    update,
    delete: _delete,
};

export default recordFetch;