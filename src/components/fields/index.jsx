import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { ToggleInput } from "../inputs";
import {
    FIELD_SCHEMA_TYPES,
} from "../../constants";
import moment from "moment";

const FIELDS_PROP = {
    field_name: PropTypes.string,
    error: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
}

const DEFAULT_FIELDS_PROP = {
    field_name: '',
    error: '',
    value: '',
    onChange: () => { },
}

const Errors = ({ error, errors, name, children }) => {
    const [errMsg, setErrMsg] = useState(null);

    useEffect(() => {
        if (error) {
            setErrMsg(error);
        } else if (errors && errors[name] && errors[name].message) {
            setErrMsg(errors[name].message);
        }
        else
            setErrMsg(null);

    }, [error, errors]);

    return children(errMsg);
}

const Text = ({ field_name, error, errors, onChange, ...props }) => {

    const __on_change__ = (e) => {
        if (!onChange) return;

        const { value, name } = e.target;
        onChange(value, name, e);
    }

    return (
        <Errors error={error} errors={errors} name={props.name}>{(errMsg) => (
            <div className="w-full px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="grid-first-name">
                    {field_name}
                </label>
                <input
                    className={`
                    appearance-none 
                    block 
                    w-full 
                    border 
                    rounded 
                    py-3 
                    px-4 
                    mb-1 
                    leading-tight 
                    focus:outline-none 
                    focus:bg-white
                    ${errMsg ? 'border-red-400 focus:border-red-500' : 'focus:border-gray-500'}
                `}
                    type="text"
                    onChange={__on_change__}
                    {...props} />
                {errMsg && <p className="text-red-500 text-xs italic">{'*'}{errMsg}</p>}
            </div>
        )}</Errors>
    );
}

const TextArea = ({ field_name, error, errors, onChange, ...props }) => {

    const __on_change__ = (e) => {
        if (!onChange) return;

        const { value, name } = e.target;
        onChange(value, name, e);
    }

    return (
        <Errors error={error} errors={errors} name={props.name}>{() => (
            <div className="w-full px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="grid-first-name">
                    {field_name}
                </label>
                <textarea
                    className={`
                    appearance-none 
                    block 
                    w-full 
                    border 
                    rounded 
                    py-3 
                    px-4 
                    mb-1 
                    leading-tight 
                    focus:outline-none 
                    focus:bg-white
                    ${error ? 'border-red-400 focus:border-red-500' : 'focus:border-gray-500'}
                `}
                    onChange={__on_change__}
                    {...props} />
                {error && <p className="text-red-500 text-xs italic">{'*'}{error}</p>}
            </div>
        )}</Errors>
    );
}

const Number = ({ field_name, error, errors, onChange, ...props }) => {

    const __on_change__ = (e) => {
        if (!onChange) return;

        const { value, name } = e.target;
        onChange(value, name, e);
    }

    return (
        <Errors error={error} errors={errors} name={props.name}>{(errMsg) => (
            <div className="w-full px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="grid-first-name">
                    {field_name}
                </label>
                <input
                    className={`
                    appearance-none 
                    block 
                    w-full 
                    border 
                    rounded 
                    py-3 
                    px-4 
                    mb-1 
                    leading-tight 
                    focus:outline-none 
                    focus:bg-white
                    ${errMsg ? 'border-red-400 focus:border-red-500' : 'focus:border-gray-500'}
                `}
                    type="number"
                    onChange={__on_change__}
                    {...props} />
                {errMsg && <p className="text-red-500 text-xs italic">{'*'}{errMsg}</p>}
            </div>
        )}</Errors>
    );
}

const Date = ({ field_name, error, errors, onChange, value, ...props }) => {

    const __on_change__ = (e) => {
        if(!onChange) return;

        const { value, name } = e.target;
        onChange(value, name);
    }

    return (
        <Errors error={error} errors={errors} name={props.name}>{(errMsg) => (
            <div className="w-full px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="grid-first-name">
                    {field_name}
                </label>
                <input
                    className={`
                    appearance-none 
                    block 
                    w-full 
                    border 
                    rounded 
                    py-3 
                    px-4 
                    mb-1 
                    leading-tight 
                    focus:outline-none 
                    focus:bg-white
                    ${errMsg ? 'border-red-400 focus:border-red-500' : 'focus:border-gray-500'}
                `}
                    type="date"
                    value={value ? moment(value).format('yyyy-MM-DD') : ''}
                    onChange={__on_change__}
                    {...props} />
                {errMsg && <p className="text-red-500 text-xs italic">{'*'}{errMsg}</p>}
            </div>
        )}</Errors>
    );
}

const Boolean = ({ value, field_name, name, onChange }) => {

    return (
        <div className="w-full px-3 mb-6 md:mb-0">
            <div className="py-3 px-4 border rounded flex">
                <p className="truncate">{field_name}</p>
                <div className="ml-auto">
                    <ToggleInput
                        name={name}
                        value={value}
                        onChange={onChange}
                    />
                </div>
            </div>
        </div>
    );
}

const Field = ({ field_type, ...props }) => {

    let FieldType = null;
    switch (field_type) {
        case FIELD_SCHEMA_TYPES.STRING:
            FieldType = <Text
                {...props}
            />
            break;
        case FIELD_SCHEMA_TYPES.NUMBER:
            FieldType = <Number
                {...props}
            />
            break;
        case FIELD_SCHEMA_TYPES.BOOLEAN:
            FieldType = <Boolean
                {...props}
            />
            break;
        case FIELD_SCHEMA_TYPES.DATE:
            FieldType = <Date
                {...props}
            />
            break;
    }

    return (
        FieldType
    );
}

Field.propTypes = {
    field_type: PropTypes.oneOf(Object.values(FIELD_SCHEMA_TYPES)).isRequired,
}

export {
    Text,
    TextArea,
    Number,
    Date,
    Boolean,
    Field,
}
