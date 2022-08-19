import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const ToggleInput = ({ value, name, onChange }) => {
    const [state, setState] = useState(false);

    useEffect(() => {
        setState(Boolean(value));
    }, [value]);

    const onToggle = (e) => {
        if(!onChange) return;

        let newState = !state;
        setState(newState);
        onChange(newState, name, e);
    }

    return (
        <button
            className="bg-totem-pole w-12 h-6 rounded-full p-1 relative"
            onClick={onToggle}
        >
            <div className="bg-black opacity-50 w-full h-full flex items-center rounded-full">
            </div>
            <span className={`
                rounded-full 
                w-5 
                h-5 
                bg-white 
                block 
                absolute 
                left-0 
                top-2/4 
                -translate-y-1/2 
                
                ${state ? 'translate-x-[.25rem]' : 'translate-x-[1.55rem]'}

                transition-all 
                duration-300 
                ease-in-out
            `} />
        </button>
    );
}

ToggleInput.defaultProps = {
    value: false,
    onChange: () => { },
}

ToggleInput.propTypes = {
    value: PropTypes.any,
    name: PropTypes.string,
    onChange: PropTypes.func,
}

const SelectInput = ({ name, value, onChange, options }) => {

    return (
        <select 
            className="outline-none px-3 py-1"
            name={name}
            value={value}
            onChange={onChange}
        >
            {options.map((opt, i) => (
                <option key={i} value={opt.value || opt.label}>{opt.label}</option>
            ))}
        </select>
    );
}

SelectInput.defaultProps = {
    onChange: () => {},
    options: [],
}

SelectInput.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string,
    })),
}

export {
    ToggleInput,
    SelectInput,
}