import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../../components/Button";
import { Field } from "../../../../components/fields";
import recordEntryFetch from "../../../../fetch/entries";
import recordFieldsFetch from "../../../../fetch/fields";
import {
    ROUTER_PAGE_ENDPOINTS,
    routePageUrlBuilder,
    getBuildUrlByEndPoints,
} from "../../../../constants/urls";
import { usePageLayoutContext } from "../../../../layout/pages";

const EntryDetailPage = () => {
    const [fields, setFields] = useState([]);
    const [fieldValues, setFieldValues] = useState({});
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
    const { record_id, entry_id } = useParams();

    const { setPrevLink } = usePageLayoutContext();

    useEffect(() => {
        async function fetchReq() {
            try {
                const data = await recordFieldsFetch.lists(record_id);

                let newFieldValues = { ...fieldValues };
                if (entry_id) {
                    // if entry_id present use its value and act as edit mode
                    const entryValues = await recordEntryFetch.retrieve(record_id, entry_id);
                    Object.assign(newFieldValues, entryValues);
                } else {
                    // set default values
                    data.forEach((field) => {
                        if (field.default)
                            newFieldValues[field.field_name] = field.default;
                    });
                }

                setFieldValues(newFieldValues);
                setFields(data);
            } catch (error) {

            }
        }

        setPrevLink({
            path: getBuildUrlByEndPoints(routePageUrlBuilder, ROUTER_PAGE_ENDPOINTS.ENTRY_LISTS_PAGE, { record_id }),
            label: 'Entries'
        });
        fetchReq();
        
        return () => {
            setPrevLink({});
        }
    }, []);

    const __on_change__ = (value, name) => {
        const newFieldValues = { ...fieldValues };
        newFieldValues[name] = value;
        setFieldValues(newFieldValues);
    }

    const __on_save__ = () => {
        async function fetchReq() {
            try {
                let data = {};
                let url = null;

                if(entry_id){
                    data = await recordEntryFetch.update(record_id, entry_id, fieldValues);
                }else{
                    data = await recordEntryFetch.create(record_id, fieldValues);
                    url = getBuildUrlByEndPoints(routePageUrlBuilder, ROUTER_PAGE_ENDPOINTS.ENTRY_DETAIL_PAGE, {
                        record_id,
                        entry_id: data._id,
                    });
                }

                if(url){
                    navigate(url, { replace: true });
                    return;
                }

                setFieldValues(data);
            } catch (error) {
                let errData = error.data;
                if (errData && error.status === 400) {
                    setErrors(errData);
                }
            }
        }

        setErrors({});
        fetchReq();
    }

    const __on_delete__ = () => {
        async function fetchReq() {
            try {
                await recordEntryFetch.delete(record_id, entry_id);
                const url = getBuildUrlByEndPoints(routePageUrlBuilder, ROUTER_PAGE_ENDPOINTS.ENTRY_LISTS_PAGE, { record_id });
                navigate(url, { replace: true });
            } catch (error) {

            }
        }

        fetchReq();
    }

    return (
        <div>
            <ul className="max-w-2xl space-y-3 mt-3">
                {fields.map((field) => (
                    <li key={field._id}>
                        <Field
                            field_type={field.field_type}
                            errors={errors}
                            field_name={field.field_name}
                            value={fieldValues[field.field_name] || ''}
                            name={field.field_name}
                            onChange={__on_change__}
                        />
                    </li>
                ))}
            </ul>
            <div className="border-2 w-full px-4 py-1 rounded-sm flex mt-3">
                <div className="flex space-x-2">
                    <Button name={"save"} color={"green"} onClick={__on_save__} />
                    <Button name={"delete"} color={"red"} onClick={__on_delete__} disabled={entry_id === undefined} />
                </div>
            </div>
        </div>
    )
}

export default EntryDetailPage;