import React, { useState, createContext } from 'react';
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import TodoComponent from '../TodoComponent/TodoComponent';
import UsersComponent from '../UsersComponent/UsersComponent'
const { TabPane } = Tabs;

export const ModelContext = createContext( [ {}, () => {}] );
const AppComponent = () => {
    const [modelData,setModelData] = useState({
        index:null,
        popupType:""
    })
    const [clickedTab, setClickedTab] = useState('1');
    const onTabChange = (key) => {
        setClickedTab(key)
    }
    return(
        <Tabs defaultActiveKey={clickedTab} onChange={onTabChange}>
            <TabPane tab='Todos' key='1'>
                <ModelContext.Provider value={[modelData,setModelData]}>
                    <TodoComponent />
                </ModelContext.Provider>
            </TabPane>
            <TabPane tab='Users' key='2'>
                <ModelContext.Provider value={[modelData,setModelData]}>
                    <UsersComponent />
                </ModelContext.Provider>
            </TabPane>
        </Tabs>
    )
}

export default AppComponent