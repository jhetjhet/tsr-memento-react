import { Fragment } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const COLORS = {
    blue: "bg-blue-500 hover:bg-blue-400 border-blue-700 hover:border-blue-500",
    red: "bg-red-500 hover:bg-red-400 border-red-700 hover:border-red-500",
    green: "bg-green-500 hover:bg-green-400 border-green-700 hover:border-green-500",
    yellow: "bg-tellow-500 hover:bg-tellow-400 border-tellow-700 hover:border-tellow-500",
}

const Button = ({ name, icon, color, disabled, ...props }) => {

    return (
        <Fragment>
            <button 
                className={`text-white font-bold py-1 px-3 border-b-4 rounded active:border-b-0 active:mt-[4px] flex items-center justify-center 
                        ${COLORS[color]}
                        ${disabled ? 'pointer-events-none opacity-70 border-b-0' : ''}
                    `}
                {...props}
            >
                { icon && (
                    <FontAwesomeIcon icon={icon} className="mr-1" />
                ) }
                <div
                    className={`${icon ? 'hidden md:block' : ''}`}
                >
                    {name}
                </div>
            </button>
        </Fragment>
    );
}

Button.defaultProps = {
    name: '',
    color: COLORS.blue,
    disabled: false,
}

Button.propTypes = {
    name: PropTypes.string,
    icon: PropTypes.object,
    color: PropTypes.oneOf(Object.keys(COLORS)),
    disabled: PropTypes.bool,
}

export default Button;