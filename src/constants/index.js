import PropTypes from "prop-types";

export const FIELD_SCHEMA_TYPES = {
    STRING: 'StringSchema',
    NUMBER: 'NumberSchema',
    BOOLEAN: 'BooleanSchema',
    DATE: 'DateSchema',
}

export const RECORD_MAIN_CONFIG = {
    to: 'temp_user',
    name: '',
}

export const RECORD_MAIN_CONFIG_PROPTYPES = PropTypes.shape({
    to: PropTypes.string,
    name: PropTypes.string,
});

export const FIELDTYPE_OPTIONS = [
    { label: 'String', value: 'StringSchema' },
    { label: 'Number', value: 'NumberSchema' },
    { label: 'Boolean', value: 'BooleanSchema' },
    { label: 'Date', value: 'DateSchema' },
];

export const COLORS = {
    amber: "bg-amber-500",
    // black: "bg-black-500",
    blue: "bg-blue-500",
    blueGray: "bg-blueGray-500",
    coolGray: "bg-coolGray-500",
    // current: "bg-current-500",
    cyan: "bg-cyan-500",
    emerald: "bg-emerald-500",
    fuchsia: "bg-fuchsia-500",
    gray: "bg-gray-500",
    green: "bg-green-500",
    indigo: "bg-indigo-500",
    // inherit: "bg-inherit-500",
    lightBlue: "bg-lightBlue-500",
    lime: "bg-lime-500",
    neutral: "bg-neutral-500",
    orange: "bg-orange-500",
    pink: "bg-pink-500",
    purple: "bg-purple-500",
    red: "bg-red-500",
    rose: "bg-rose-500",
    sky: "bg-sky-500",
    slate: "bg-slate-500",
    stone: "bg-stone-500",
    teal: "bg-teal-500",
    // transparent: "bg-transparent-500",
    trueGray: "bg-trueGray-500",
    violet: "bg-violet-500",
    warmGray: "bg-warmGray-500",
    // white: "bg-white-500",
    yellow: "bg-yellow-500",
    zinc: "bg-zinc-500",
}