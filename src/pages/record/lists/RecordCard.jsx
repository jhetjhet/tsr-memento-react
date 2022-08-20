import DotMenu from "../../../components/DotMenu";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import {
    ROUTER_PAGE_ENDPOINTS,
    routePageUrlBuilder,
    getBuildUrlByEndPoints,
} from "../../../constants/urls";
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-initials-sprites';

const DOT_OPTIONS = {
    DELETE: 'delete',
    EDIT: 'edit',
}

const RecordCard = ({ id, name, background, onDelete }) => {

    const navigate = useNavigate();

    const onOptionSelect = (val) => {
        switch (val) {
            case DOT_OPTIONS.EDIT:
                const url = getBuildUrlByEndPoints(routePageUrlBuilder, ROUTER_PAGE_ENDPOINTS.RECORD_DETAIL_PAGE, {
                    record_id: id,
                });
                navigate(url, { replace: true });
                break;
            case DOT_OPTIONS.DELETE:
                onDelete(id);
                break;
        }
    }

    let SVG = createAvatar(style, {
        seed: name,
        backgroundColor: background,
    });

    return (
        <div className="w-full h-48 lg:h-56 bg-white overflow-hidden border-2 border-totem-pole rounded-lg relative shadow-lg hover:shadow-xl">
            <Link
                to={getBuildUrlByEndPoints(routePageUrlBuilder, ROUTER_PAGE_ENDPOINTS.ENTRY_LISTS_PAGE, { record_id: id })}
                replace
            >
                <div className="w-full h-full bg-gray-50 hover:bg-gray-200">
                    <div className="h-4/5 w-full flex justify-center items-center">
                        <div className="overflow-hidden rounded-sm">
                            <div
                                className="w-24 h-24"
                                dangerouslySetInnerHTML={{ __html: SVG }}
                            />
                        </div>
                    </div>
                    <div className="px-2 flex items-center justify-center">
                        <p className="mt-2 w-64 font-semibold truncate text-center">{name}</p>
                    </div>
                </div>
            </Link>

            <div className="absolute right-1 top-1">
                <DotMenu
                    options={[
                        { label: DOT_OPTIONS.EDIT },
                        { label: DOT_OPTIONS.DELETE },
                    ]}
                    onSelect={onOptionSelect}
                />
            </div>

        </div>
    );
}

RecordCard.defaultProps = {
    name: '',
    background: 'red',
    onDelete: () => { },
}

RecordCard.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    background: PropTypes.string,
    onDelete: PropTypes.func,
}

export default RecordCard;