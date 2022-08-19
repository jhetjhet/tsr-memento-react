import React from "react";
import { useParams } from "react-router-dom";
import recordFieldsFetch from "../../../../fetch/fields";
import DotMenu from "../../../../components/DotMenu";
import { ToggleInput } from "../../../../components/inputs";
import { Text } from "../../../../components/fields";
import PropTypes from "prop-types";

const DOT_OPTIONS = {
    SAVE: 'save',
    REMOVE: 'remove',
    DELETE: 'delete',
}

const CONFIG_COLOR_STATE = {
    INIT: 'bg-blue-500',
    CREATED: 'bg-red-500',
    EDITED: 'bg-green-500',
}

class MainFieldForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            errors: {},
            initialConfig: null,
        }

        this.__on_change__ = this.__on_change__.bind(this);
        this.__on_option_select__ = this.__on_option_select__.bind(this);

        this.getConfig = this.getConfig.bind(this);
        this.save = this.saveOrUpdate.bind(this);
        this.delete = this.deleteField.bind(this);
    }

    componentDidMount() {
        const { config } = this.props;
        if (this.state.initialConfig === null)
            this.setState({ initialConfig: config });
    }

    saveOrUpdate() {
        const { config, updateField } = this.props;
        const { record_id } = this.props.params;
        const field_id = config._id;
        const field_key = config.fkey;

        let parent = this;

        async function fetchRequest() {

            if (config.__save__ !== true && config.__created__ !== true)
                return;

            let req = null;
            let fieldData = { ...config };
            delete fieldData._id;

            if (config.__created__)
                req = recordFieldsFetch.create(record_id, fieldData);
            else
                req = recordFieldsFetch.update(record_id, field_id, fieldData);
            try {
                const data = await req;
                parent.setErrors({});
                parent.setState({
                    initialConfig: data,
                })
                updateField(field_key, data);
            } catch (error) {
                let errData = error.data;
                if (errData && error.status === 400) {
                    parent.setErrors(errData);
                }
            }
        }

        this.setErrors({});
        fetchRequest();
    }

    deleteField() {
        const { config, removeField } = this.props;
        
        if(config.__created__ === true || !config._id)
            return;

        const { record_id } = this.props.params;
        const field_id = config._id;
        const field_key = config.fkey;

        async function fetchRequest() {
            try {
                await recordFieldsFetch.delete(record_id, field_id);
                removeField(field_key);
            } catch (error) {
                console.log(error)
            }
        }

        fetchRequest();
    }

    getConfig(){
        return {...this.props.config};
    }

    doSave(){
        const { config } = this.props;
        return config.__created__ === true || config.__save__ === true;
    }

    setErrors(errors){
        this.setState({
            errors,
        })
    }

    __config_change__(newConfig) {
        const { initialConfig } = this.state;

        for (let k of Object.keys(initialConfig)) {
            if (newConfig[k] !== initialConfig[k])
                return true;
        }

        return false;
    }

    __update_field_config__(newConfig) {
        const { initialConfig } = this.state;
        const { config, updateField } = this.props;
        const field_key = config.fkey;

        if (initialConfig && initialConfig.__created__ !== true)
            newConfig.__save__ = this.__config_change__(newConfig);

        updateField(field_key, newConfig);
    }

    __on_change__(value, name) {
        const { config } = this.props;
        const newConfig = { ...config };
        newConfig[name] = value;
        this.__update_field_config__(newConfig);
    }

    __on_option_select__(val) {
        const { removeField } = this.props;
        const field_key = this.props.config.fkey;
        switch (val) {
            case DOT_OPTIONS.REMOVE:
                removeField(field_key);
                break;
            case DOT_OPTIONS.DELETE:
                this.deleteField();
                break;
            case DOT_OPTIONS.SAVE:
                this.saveOrUpdate();
                break;
            default:
                break;
        }
    }

    render() {
        const { config } = this.props;
        const { errors } = this.state;

        let stateColor = CONFIG_COLOR_STATE.INIT;
        if (config.__created__)
            stateColor = CONFIG_COLOR_STATE.CREATED;
        else if (config.__save__)
            stateColor = CONFIG_COLOR_STATE.EDITED;

        return (
            <div className="max-w-2xl border bg-gray-100 relative">
                <p className="text-center font-bold text-lg">{config.field_type}</p>
                <Text
                    errors={errors}
                    field_name={"Field Name"}
                    name="field_name"
                    value={config.field_name}
                    onChange={this.__on_change__}
                />
                <div className="px-3 py-2 text-sm">
                    <div className="grid grid-cols-2">
                        <div className="flex">
                            <p className="mr-3">Required: </p>
                            <ToggleInput
                                name="required"
                                value={config.required}
                                onChange={this.__on_change__}
                            />
                        </div>
                        <div className="flex">
                            <p className="mr-3">Immutable: </p>
                            <ToggleInput
                                name="immutable"
                                value={config.immutable}
                                onChange={this.__on_change__}
                            />
                        </div>
                    </div>
                </div>
                <div className="absolute top-0 right-0">
                    <DotMenu
                        options={[
                            { label: 'remove', value: DOT_OPTIONS.REMOVE, disable: (config.__created__ !== true) },
                            { label: 'delete', value: DOT_OPTIONS.DELETE, disable: (config.__created__ === true) },
                            { label: 'save', value: DOT_OPTIONS.SAVE, disable: (config.__created__ !== true && config.__save__ !== true) },
                        ]}
                        onSelect={this.__on_option_select__}
                    />
                </div>

                <div className="absolute left-1 top-1">
                    <span className={`
                    block w-3 h-3 rounded-full
                    ${stateColor}
                `} />
                </div>
            </div>
        );
    }
}

MainFieldForm.propTypes = {
    config: PropTypes.object.isRequired, // props validation is handle by its FieldForm wrapper

    updateField: PropTypes.func.isRequired,
    removeField: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
}

// MainFieldForm wrapper
const FieldForm = React.forwardRef(({updateField, removeField, ...config}, ref) => {
    const params = useParams();

    return <MainFieldForm
        ref={ref}
        params={params}
        updateField={updateField}
        removeField={removeField}
        config={config}
    />
});

FieldForm.propTypes = {
    // no default values
    fkey: PropTypes.string.isRequired,
    _id: PropTypes.string,
    field_type: PropTypes.oneOf(['StringSchema', 'NumberSchema', 'BooleanSchema', 'DateSchema']).isRequired,

    // with default values
    field_name: PropTypes.string,
    required: PropTypes.bool,
    immutable: PropTypes.bool,

    __created__: PropTypes.bool, // identify if record field is newly created
    __save__: PropTypes.bool, // identifiy if record field should be save
}

FieldForm.defaultProps = {
    field_name: '',
    required: true,
    immutable: false,

    // __created__: false,
    // __save__: false,
}

export default FieldForm;