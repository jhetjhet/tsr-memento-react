import { useEffect, useState } from "react";
import Button from "../../../../components/Button";
import FieldForm from "./field_form";
import { v4 } from "uuid";
import {
    FIELDTYPE_OPTIONS,
} from "../../../../constants";
import { SelectInput } from "../../../../components/inputs";
import {
    faSave,
    faXmark,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import MultiRef from 'react-multi-ref';
import recordFieldsFetch from "../../../../fetch/fields";
import { useParams } from "react-router-dom";

const FieldConfig = () => {
    const [fieldType, setFieldType] = useState(FIELDTYPE_OPTIONS[0].value);
    const [fieldConfigs, setFieldConfigs] = useState([]);

    const formFieldRefs = new MultiRef();
    const { record_id } = useParams();

    useEffect(() => {
        async function fetchReq(){
            try {
                let fconfs = await recordFieldsFetch.lists(record_id);
                fconfs = fconfs.map((fconf) => {
                    fconf.fkey = v4();
                    return fconf;
                });
                setFieldConfigs(fconfs);
            } catch (error) {
                console.log(error)
            }
        }

        if(record_id)
            fetchReq();
    }, [record_id]);

    const __add_field_config__ = (config) => {
        if(!config.fkey){
            let fkey = v4();
            config.fkey = fkey;
        }
        let newFieldConfigs = [...fieldConfigs, config];
        setFieldConfigs(newFieldConfigs);
    }

    const __remove_field_config__ = (fkey) => {
        setFieldConfigs((prevConf) => {
            let newFieldConfigs = prevConf.filter((fconf) => fconf.fkey !== fkey);
            return newFieldConfigs;
        });
    }

    const __update_field_config__ = (fkey, config) => {
        if(!config.fkey)
            config.fkey = fkey;
        setFieldConfigs((prevConf) => {
            let newFieldConfigs = prevConf.map((fconf) => {
                if(fkey === fconf.fkey)
                    return config;
                return fconf;
            });
            return newFieldConfigs;
        });
    }

    const onFieldAdd = () => {
        let conf = { field_type: fieldType, __created__: true };
        __add_field_config__(conf);
    }

    const onFieldTypeSelect = (e) => {
        setFieldType(e.target.value);
    }

    const onFieldConfigsSave = () => {
        formFieldRefs.map.forEach(async (formRef) => {
            if (formRef.doSave())
                formRef.save();
        });
    }

    const onFieldConfigsClear = () => {
        let newFieldConfigs = fieldConfigs.filter((fconf) => (fconf.__created__ !== true));
        setFieldConfigs(newFieldConfigs);
    }

    const onFieldConfigsDelete = () => {
        formFieldRefs.map.forEach(async (formRef) => {
            formRef.delete();
        });
    }

    return (
        <div className="w-full min-h-[16rem]">

            <div className="bg-gray-200 p-2">
                <ul className="space-y-2 min-h-[16rem]">
                    {fieldConfigs.map((conf) => (
                        <li key={conf.fkey}>
                            <FieldForm 
                                ref={formFieldRefs.ref(conf.fkey)}
                                updateField={__update_field_config__}
                                removeField={__remove_field_config__}
                                {...conf}
                            />
                        </li>
                    ))}
                </ul>

                <div className="fixed right-0 bottom-3 bg-violet-400 p-2 rounded-lg mr-3">
                    <div className="flex">
                        <SelectInput
                            options={FIELDTYPE_OPTIONS}
                            value={fieldType}
                            onChange={onFieldTypeSelect}
                        />
                        <Button name="+" color="green" onClick={onFieldAdd} />
                    </div>
                </div>
            </div>

            <div className="border-2 w-full px-4 py-1 rounded-sm flex mt-3">
                <div className="flex space-x-2">
                    <Button name={"save all"} color={"green"} icon={faSave}
                        onClick={onFieldConfigsSave}
                    />
                    <Button name={"clear all"} color={"blue"} icon={faXmark}
                        onClick={onFieldConfigsClear}
                    />
                    <Button name={"delete all"} color={"red"} icon={faTrash}
                        onClick={onFieldConfigsDelete}
                    />
                </div>
            </div>
        </div>
    );
}

export default FieldConfig;