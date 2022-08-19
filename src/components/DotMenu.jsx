import React, { useState, useRef, useEffect } from 'react';
import PropTypes from "prop-types";

function DotMenu({
    options,
    onSelect,
}) {

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const trigger = useRef(null);
    const dropdown = useRef(null);

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
            setDropdownOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    }, []);

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (dropdownOpen || keyCode !== 27) return;
            setDropdownOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    }, []);

    return (
        <div className="relative w-fit">
            <button
                ref={trigger}
                className={`text-slate-400 hover:text-slate-500 rounded-full ${dropdownOpen && 'bg-slate-100 text-slate-500'}`}
                aria-haspopup="true"
                onClick={() => setDropdownOpen(!dropdownOpen)}
            >
                <span className="sr-only">Menu</span>
                <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                    <circle cx="16" cy="16" r="2" />
                    <circle cx="10" cy="16" r="2" />
                    <circle cx="22" cy="16" r="2" />
                </svg>
            </button>
            <div
                className={dropdownOpen ? '' : 'hidden'}
                ref={dropdown}
            >
                <ul className="w-32 bg-white absolute top-8 right-2 shadow-lg">
                    {options.map((opt, indx) => (
                        <li 
                            key={indx}
                            className="p-1"
                            onClick={() => {
                                onSelect(opt.value || opt.label);
                                setDropdownOpen(false);
                            }}
                        >
                            <span
                                className={`
                                    font-medium 
                                    text-sm 
                                    text-slate-600 
                                    hover:text-slate-800 
                                    hover:bg-blue-300 
                                    flex 
                                    py-1 
                                    px-3 
                                    cursor-pointer

                                    ${opt.disable === true ? 'pointer-events-none text-slate-300' : ''}
                                `}
                                
                            >{opt.label}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

DotMenu.defaultProps = {
    options: [],
    onSelect: () => {},
}

DotMenu.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string,
        disable: PropTypes.bool,
    })),
    onSelect: PropTypes.func,
}

export default DotMenu;