import { useParams } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import FieldConfig from "./fields";
import MainConfig from "./main";

const RecordDetail = () => {
    let { record_id } = useParams();

    return (
        <div>
            <Tabs forceRenderTabPanel={true}>
                <TabList>
                    <Tab>
                        MAIN
                    </Tab>
                    <Tab disabled={record_id === undefined}>FIELDS</Tab>
                </TabList>

                <TabPanel>
                    <MainConfig />
                </TabPanel>
                <TabPanel>
                    <FieldConfig />
                </TabPanel>
            </Tabs>
        </div>
    );
}

export default RecordDetail;