import React, { useEffect, useState,useContext } from 'react';
import { Modal } from 'antd';
import moment from 'moment'
import './index.css';
import * as action from '../../Actions';
import {ModelContext} from '../AppComponent';
import {connect} from 'react-redux'
import {message, Form, Input, DatePicker } from "antd";

const UserForm = (props) => {
    const [modelState, setModelState] = useContext(ModelContext)
    const [popupTitle, setPopupTitle] = useState("");
    const [ModelVisible, setModelVisible] = useState(true);
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
        props.cancelClick(false)
        setModelState({...modelState, index:null,popupType:''})
        setModelVisible(false)
    }

    /**
     * Function to update the data
     * @function updateData
     */

     async function updateData () {
        setIsLoading(true)
        let tempUser = [...props.users];
        tempUser[modelState.index].name = action;
        tempUser[modelState.index].addedDate = addedDate;
        tempUser[modelState.index].addedMoment = addedMoment;
        await wait(2000);
        setIsLoading(false)
        props.AddUser(tempUser)
        setModelState({...modelState, index:null,popupType:''})
    }
    
    /**
     * Method to validate the data in the form
     * @function validateData
     */
    const validateData = () => {
        if(action == '' && addedDate == ''){
            message.error('Please fill all the details to save');
            return false
        }
        else if(action == ''){
            message.error('Please enter the user name to save');
            return false
        }
        else if(addedDate == ''){
            message.error('Please select the date to save');
            return false
        }
        else{
            return true
        }
    }

    /**
     * Function to save the data in the model
     * @function saveClick
     */
    async function saveData() {
        const validateFlag = validateData()
        if(validateFlag){
            setIsLoading(true)
            let tempUser = [...props.users];
            let newObject = {
                "key" : tempUser.length,
                "name":action,
                "addedDate":addedDate,
                "addedMoment":addedMoment._d
            }
            tempUser.push(newObject)
            await wait(2000);
            setIsLoading(false)
            props.AddUser(tempUser)
            setModelState({...modelState, index:null,popupType:''});
            props.cancelClick();
        }
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
         if(modelState.index !== null){
            setPopupTitle('Add New User')
            setAction(props.users[modelState.index].name);
            setAddedDate(props.users[modelState.index].addedDate);
            setAddedMoment(moment(props.users[modelState.index].addedMoment));
        }
        else{
            setPopupTitle('Update User')
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
                <Form.Item label={"Name"}>
                    <Input placeholder={"Name"} value={action} onChange={InputChange}/>
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
        users:global_state.user.users
    }
}
export default connect(mapStateToProps,action)(UserForm)