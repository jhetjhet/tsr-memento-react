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
    amber: "amber",
    blue: "blue",
    blueGrey: "blueGrey",
    brown: "brown",
    cyan: "cyan",
    deepOrange: "deepOrange",
    deepPurple: "deepPurple",
    green: "green",
    grey: "grey",
    indigo: "indigo",
    lightBlue: "lightBlue",
    lightGreen: "lightGreen",
    lime: "lime",
    orange: "orange",
    pink: "pink",
    purple: "purple",
    red: "red",
    teal: "teal",
    yellow: "yellow",
}