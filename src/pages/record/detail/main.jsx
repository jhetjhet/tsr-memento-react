import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/Button";
import { Text, TextArea } from "../../../components/fields";
import recordFetch from "../../../fetch/record";
import {
    ROUTER_PAGE_ENDPOINTS,
    routePageUrlBuilder,
    getBuildUrlByEndPoints,
} from "../../../constants/urls";
import { usePageLayoutContext } from "../../../layout/pages";
import {
    getRandomColor,
} from "../../../utils";

const RECORD_MAIN_CONFIG = {
    to: 'temp_user',
    name: '',
    description: '',
}

const MainConfig = () => {
    const [mainConfig, setMainConfig] = useState(RECORD_MAIN_CONFIG);
    const [errors, setErrors] = useState({});
    
    const { setPrevLink } = usePageLayoutContext();
    const navigate = useNavigate();
    const { record_id } = useParams();

    useEffect(() => {
        async function fetchReq(){
            try {
                const data = await recordFetch.retrieve(record_id);
                setMainConfig(data);
            } catch (error) {
                
            }
        }

        setPrevLink({
            path: getBuildUrlByEndPoints(routePageUrlBuilder, ROUTER_PAGE_ENDPOINTS.RECORD_LISTS_PAGE),
            label: 'Records'
        });
        if(record_id)
            fetchReq();

        return () => {
            setPrevLink({});
        }
    }, [record_id]);

    const onFieldsChange = (value, name) => {
        let newMainConfig = {...mainConfig};
        newMainConfig[name] = value;
        setMainConfig(newMainConfig);
    }

    const onSave = async () => {
        let mconfData = {...mainConfig};
        if(!mconfData.background){
            mconfData.background = getRandomColor()[0];
        }
        try {
            let req;
            if(record_id)
                req = recordFetch.update(record_id, mconfData);
            else
                req = recordFetch.create(mconfData);
            
            const data = await req;
            const url = getBuildUrlByEndPoints(routePageUrlBuilder, ROUTER_PAGE_ENDPOINTS.RECORD_DETAIL_PAGE, {
                record_id: data._id,
            });
            navigate(url, { replace: true });
        } catch (error) {
            let errData = error.data;
            if(errData && error.status === 400){
                setErrors(errData);
            }
        }
    }

    const onDelete = () => {
        async function fetchReq(){
            try {
                await recordFetch.delete(record_id);
                const url = getBuildUrlByEndPoints(routePageUrlBuilder, ROUTER_PAGE_ENDPOINTS.RECORD_LISTS_PAGE);
                navigate(url, { replace: true });
            } catch (error) {
                
            }
        }

        if(record_id)
            fetchReq();
    }
    
    return (
        <div className="w-full min-h-[16rem]">

            <div className="max-w-2xl">
                <Text 
                    field_name={"Record Name"} 
                    errors={errors}
                    value={mainConfig.name}
                    name="name"
                    onChange={onFieldsChange}
                />
                <TextArea 
                    field_name={"Description"} 
                    errors={errors}
                    value={mainConfig.description}
                    name="description"
                    onChange={onFieldsChange}
                />
            </div>

            <div className="border-2 w-full px-4 py-1 rounded-sm flex mt-3">
                <div className="flex space-x-2">
                    <Button name={"save"} color={"green"} onClick={onSave} />
                    <Button name={"delete"} color={"red"} onClick={onDelete} disabled={!record_id} />
                </div>
            </div>
        </div>
    );
}

export default MainConfig;