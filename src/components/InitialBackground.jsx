import { useEffect, useState } from "react";
import { nameToInitials, getRandomColor } from "../utils/index";
import PropTypes from "prop-types";
import {
    COLORS,
} from "../constants";

const InitialBackhround = ({ name, bgColor }) => {
    const [initDisplay, setInitDisplay] = useState('');
    const [_bgColor, setBgColor] = useState('');

    useEffect(() => {
        setBgColor(COLORS[bgColor]);
    }, [bgColor]);

    useEffect(() => {
        setInitDisplay(nameToInitials(name, 2));
    }, [name]);

    return (
        <div className={`w-24 h-24 flex items-center justify-center ${_bgColor}`}>
            <span className="text-white font-thin text-xl">{initDisplay}</span>
        </div>
    );
}

InitialBackhround.propTypes = {
    name: PropTypes.string,
    bgColor: PropTypes.oneOf(Object.keys(COLORS)),
}

export default InitialBackhround;