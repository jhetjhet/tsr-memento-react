import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    faArrowCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const pageLayoutContext = createContext();

export function usePageLayoutContext() {
    return useContext(pageLayoutContext);
}

const LINK = {
    path: null,
    label: '',
}

const PageLayout = ({ header, prevLink, children }) => {
    const [_header, setHeader] = useState(null);
    const [_prevLink, setPrevLink] = useState(LINK);

    useLayoutEffect(() => {
        setHeader(header);
        setPrevLink(prevLink);
    }, [header, prevLink]);

    return (
        <div className="container mx-auto px-4 py-3 grow">
            <div className="p-2 shadow-md border mb-3 flex items-center">
                <h1 className="text-xl md:text-2xl capitalize font-extrabold text-totem-pole">{_header}</h1>
                {(_prevLink && _prevLink.path) && (
                    <span className="ml-auto mr-3">
                        <Link
                            to={_prevLink.path}
                            replace
                            className="text-blue-500 flex items-center justify-center group"
                        >
                            <FontAwesomeIcon icon={faArrowCircleLeft}
                                className="transition-all ease-in-out duration-300 group-hover:-translate-x-2"
                            />
                            <span className="ml-1 group-hover:text-blue-400">{_prevLink.label}</span>
                        </Link>
                    </span>
                )}
            </div>

            <div className="flex flex-col h-full">
                <pageLayoutContext.Provider value={{
                    setHeader,
                    setPrevLink,
                    prevLink: _prevLink,
                    header: _header,
                }}>
                    { children }
                </pageLayoutContext.Provider>
            </div>
        </div>
    );
}

PropTypes.propTypes = {
    header: PropTypes.string,
    prevLink: PropTypes.string,
}

export default PageLayout;