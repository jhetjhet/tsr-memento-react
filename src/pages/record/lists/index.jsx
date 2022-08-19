import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import { 
    ROUTER_PAGE_ENDPOINTS,
    getBuildUrlByEndPoints,
    routePageUrlBuilder,
} from "../../../constants/urls";
import recordFetch from "../../../fetch/record";
import RecordCard from "./RecordCard";

const RecordPage = () => {
    const [records, setRecords] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await recordFetch.lists();
                setRecords(data);
            } catch (error) {
                    
            }
        }

        fetchData();
    }, []);

    const onRecordAdd = () => {
        const url = getBuildUrlByEndPoints(routePageUrlBuilder, ROUTER_PAGE_ENDPOINTS.CREATE_RECORD_PAGE);
        navigate(url, { replace: true });
    }

    const onRecordDelete = (id) => {
        async function fetchReq() {
            try {
                await recordFetch.delete(id);
                setRecords((prevRec) => prevRec.filter((rec) => rec._id !== id));
            } catch (error) {
                
            }
        }

        fetchReq();
    }

    return (
        <div className="">
            <div className="flex my-2 justify-end">
                <Button 
                    name="create record"
                    color="green"
                    onClick={onRecordAdd}
                />
            </div>
            <div className="w-full min-h-[60vh] flex flex-col">
                {records.length > 0 ? (
                    <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-8">
                        { records.map((rec) => (
                            <li
                                className=""
                                key={rec._id}
                            >
                               <RecordCard 
                                    id={rec._id}
                                    name={rec.name}
                                    onDelete={onRecordDelete}
                                    background={rec.background}
                               /> 
                            </li>
                        )) }
                    </ul>
                ) : (
                    <div className="grow flex">
                        <div className="m-auto">
                            <h1 className="text-center text-gray-400 text-xl">No records yet !</h1>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default RecordPage;