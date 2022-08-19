import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import recordEntryFetch from "../../../../fetch/entries";
import ListsViewPage from "./ListsViewPage";
import {
    ROUTER_PAGE_ENDPOINTS,
    routePageUrlBuilder,
    getBuildUrlByEndPoints,
} from "../../../../constants/urls";
import { usePageLayoutContext } from "../../../../layout/pages";
import recordFetch from "../../../../fetch/record";

const EntryListsPage = () => {
    const [entries, setEntries] = useState([]);
    const [record, setRecord] = useState(null);

    const { setPrevLink, setHeader } = usePageLayoutContext();

    const { record_id } = useParams();

    useEffect(() => {
        async function fetchReq(){
            try {
                const data = await recordEntryFetch.lists(record_id);
                const recordData = await recordFetch.retrieve(record_id);
                setEntries(data);
                setRecord(recordData);
            } catch (error) {
                
            }
        }

        setPrevLink({
            path: getBuildUrlByEndPoints(routePageUrlBuilder, ROUTER_PAGE_ENDPOINTS.RECORD_LISTS_PAGE),
            label: 'Records'
        });
        
        fetchReq();
        
        return () => {
            setPrevLink({});
        }
    }, []);

    useEffect(() => {
        if(record)
            setHeader(`'${record.name}': Entries`)
    }, [record]);  

    let listsDisplay;

    if(entries.length > 0)
        listsDisplay = (
            <ListsViewPage 
                entries={entries}
            />
        )
    else
        listsDisplay = (
            <div className="w-full h-full flex pb-12">
                <div className="grow bg-gray-200 mb-8 flex items-center justify-center">
                    <h1 className="text-center text-gray-400 text-xl">No entries yet !</h1>
                </div>
            </div>
        )

    return (
        <div className="grow">

            { listsDisplay }

            <div className="fixed bottom-6 right-6">
                <Link 
                    to={getBuildUrlByEndPoints(routePageUrlBuilder, ROUTER_PAGE_ENDPOINTS.CREATE_ENTRY_PAGE, { record_id })}
                    className="w-12 h-12 bg-green-500 rounded-full shadow-md font-extrabold flex items-center justify-center hover:bg-green-400 hover:shadow-lg">
                    +
                </Link>
            </div>
        </div>
    );
}


export default EntryListsPage;