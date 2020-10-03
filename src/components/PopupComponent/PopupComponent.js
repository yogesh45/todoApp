import React, { useEffect, useState,useContext } from 'react';
import { Modal } from 'antd';
import moment from 'moment'
import './index.css';
import * as action from '../../Actions';
import {ModelContext} from '../AppComponent';
import {connect} from 'react-redux'
import { Form, Input, DatePicker } from "antd";

const PopupComponent = (props) => {
    const [modelState, setModelState] = useContext(ModelContext)
    const [popupType,setPopupType] = useState(props.type);
    const [popupTitle, setPopupTitle] = useState("");
    const [ModelVisible, setModelVisible] = useState(props.visible);
    const [action,setAction] = useState("");
    const [addedDate,setAddedDate] = useState('');
    const [addedMoment,setAddedMoment] = useState("");
    const [isLoading,setIsLoading] = useState(false)
    const [form] = Form.useForm();

    /**
     * Function to hide the model
     * @function onCancelClick
     */
    const CancelClick = () => {
        setModelState({...modelState, index:null,popupType:''})
    }

    /**
     * Function to update the data
     * @function updateData
     */

     async function updateData () {
        setIsLoading(true)
        if(modelState.popupType === 'todo'){
            let tempTodo = [...props.todos]
            tempTodo[modelState.index].todo = action;
            tempTodo[modelState.index].addedDate = addedDate;
            tempTodo[modelState.index].addedMoment = addedMoment;
            await wait(2000);
            setIsLoading(false)
            props.AddTodo(tempTodo)
        }
        else if(modelState.popupType === 'user'){
            let tempUser = [...props.users];
            tempUser[modelState.index].name = action;
            tempUser[modelState.index].addedDate = addedDate;
            tempUser[modelState.index].addedMoment = addedMoment;
            await wait(2000);
            setIsLoading(false)
            props.AddUser(tempUser)
        }
        setModelState({...modelState, index:null,popupType:''})
    }

    /**
     * Function to save the data in the model
     * @function saveClick
     */
    async function saveData() {
        setIsLoading(true)
        if(modelState.popupType === 'todo'){
            let tempTodo = [...props.todos]
            let newObject = {
                "key" : tempTodo.length,
                "todo":action,
                "addedDate":addedDate,
                "addedMoment":addedMoment._d
            }
            tempTodo.push(newObject);
            await wait(2000);
            setIsLoading(false)
            props.AddTodo(tempTodo)
        }
        else if(modelState.popupType === 'user'){
            let tempUser = [...props.users];
            let newObject = {
                "key" : tempUser.length,
                "name":action,
                "addedDate":addedDate,
                "addedMoment":addedMoment._d
            }
            tempUser.push(newObject)
            await wait(2000);
            setIsLoading(true)
            props.AddUser(tempUser)
        }
          
        setModelState({...modelState, index:null,popupType:''})
    }

    
    async function wait(duration = 1000) {
        await new Promise(resolve => setTimeout(resolve, duration));
    }

    /**
     * Function to get the selected date
     * @function DateChange
     * @param - event - e
     */
    
     const DateChange = (moment, string) => {
        setAddedMoment(moment)
        setAddedDate(string)
     }

    /**
     * Function to get the value from the input
     * @function InputChange
     * @param event - e
     */
    const InputChange = (e) => {
        setAction(e.target.value)
    }

    /**
     * UseEffect to change the Modal title if the popupType changes
     */
    useEffect(() => {
        setPopupType(props.type)
        modelState.popupType === 'todo'? setPopupTitle('Add New Todo') : modelState.popupType === 'user' ? setPopupTitle('Add New User') : setPopupTitle('')
        modelState.popupType === 'todo' || modelState.popupType === 'user' ? setModelVisible(true) : setModelVisible(false);
        if(modelState.index !== null && modelState.popupType === 'todo'){
            setAction(props.todos[modelState.index].todo);
            setAddedDate(props.todos[modelState.index].addedDate);
            setAddedMoment(moment(props.todos[modelState.index].addedMoment));
        }
        else if(modelState.index !== null && modelState.popupType === 'user'){
            setAction(props.users[modelState.index].name);
            setAddedDate(props.users[modelState.index].addedDate);
            setAddedMoment(moment(props.users[modelState.index].addedMoment));
        }
        else{
            setAction('');
            setAddedDate('');
            setAddedMoment('')
        }
    }, [modelState])

    return(
        <Modal title={popupTitle} visible={ModelVisible} onOk={modelState.index != null ? updateData : saveData} onCancel={CancelClick} okButtonProps={{
            loading: isLoading 
          }}
          okText="Save"
          cancelText="Cancel">
            <Form form={form} layout="vertical">
                <Form.Item label={modelState.popupType === 'todo' ? "Action" : "Name"}>
                    <Input placeholder={modelState.popupType === 'todo' ? "Action" : "Name"} value={action} onChange={InputChange}/>
                </Form.Item>
                <Form.Item label='DateAdded' required>
                    <DatePicker placeholder='Select a date' value={addedMoment} onChange={DateChange}/>
                </Form.Item>
            </Form>
        </Modal>
    )
}
const mapStateToProps = global_state => {
    return{
        todos:global_state.todo.todos,
        users:global_state.user.users
    }
}
export default connect(mapStateToProps,action)(PopupComponent)