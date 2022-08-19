import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
    ROUTER_PAGE_ENDPOINTS,
    routePageUrlBuilder,
    getBuildUrlByEndPoints,
} from "../../../../constants/urls";

const ListViewCard = ({ id, record_id, label }) => {
    const [url, setUrl] = useState('/');

    useEffect(() => {
        const newUrl = getBuildUrlByEndPoints(routePageUrlBuilder, ROUTER_PAGE_ENDPOINTS.ENTRY_DETAIL_PAGE, {
            record_id,
            entry_id: id,
        });
        setUrl(newUrl);
    }, [id]);

    return (
        <li>
            <Link 
                to={url}
                replace
                className="w-full min-h-[3.5rem] bg-white border rounded-full shadow-lg cursor-pointer flex items-center px-8 hover:shadow-2xl">
                <p className="text-gray-600">{label}</p>
            </Link>
        </li>
    );
}

ListViewCard.defaultProps = {
    label: '',
}

ListViewCard.propTypes = {
    id: PropTypes.string.isRequired,
    record_id: PropTypes.string.isRequired,
    label: PropTypes.string,
}

const ListsViewPage = ({ entries }) => {


    return (
        <ul className="w-full p-2 space-y-3">
            { entries.map((entry) => (
                <ListViewCard 
                    key={entry._id}
                    id={entry._id}
                    record_id={entry._record}
                    label={entry._id}
                />
            )) }
        </ul>
    );
}

ListsViewPage.defaultProps = {
    entries: [],
}

ListsViewPage.propTypes = {
    entries: PropTypes.array,
}

export default ListsViewPage;