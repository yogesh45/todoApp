import React, {useState,useEffect,useContext} from 'react';
import { Table , Space, Button } from 'antd';
import PopupComponent from '../PopupComponent/PopupComponent';
import 'antd/dist/antd.css';
import { connect} from 'react-redux';
import * as action from '../../Actions';
import {ModelContext} from '../AppComponent';
const { Column } = Table;

const UsersComponent = (props) => {
    const [modelState, setModelState] = useContext(ModelContext)
    const [users,setUsers] = useState(props.users);
    const [showModel, setShowModel] = useState(false);

    /**
     * UseEffect to set the users if any user is added/Updated/deleted
     */
    useEffect(() => {
        setUsers(props.users)
    },[props.users])

    /**
     * Function to update a user
     * @function onEditClick
     * @param {*} flag 
     */
    const onEditClick = (key,e) => {
        setShowModel(true)
        setModelState({...modelState, index:key,popupType:'user'})
    }

    /**
     * Function to delete user
     * @function deleteUser
     * @param {key} - key to delete the user
     */
    const deleteUser = (key,e) => {
        let tempTodos = [...props.users];
        let idx = tempTodos.findIndex(e => e.key == key)
        tempTodos.splice(idx,1);
        props.AddUser(tempTodos)
    }
    /**
     * Function to create a new user
     * @param {*} flag 
     */
    const createUser = (flag) => {
        setShowModel(flag)
        setModelState({...modelState, index:null,popupType:'user'})
    }
      return(
          <div className='users_component'>
            <Button onClick={() => createUser(true)}>Create User</Button>
            <br/>
            <br/>
            <Table dataSource={users}>
                <Column title="Name" dataIndex="name" key="name" />
                <Column title="Action" key="action"
                    render={(text, record) => (
                        <Space size="middle">
                            <a onClick={ (e) => onEditClick(record.key,e)}>Edit</a>
                            <a onClick={ (e) => deleteUser(record.key,e)}>Delete</a>
                        </Space>
                    )}
                />
            </Table>
            {
                showModel ? <PopupComponent type='user' visible={true}/> : ''
            }
          </div>
        
    )
}

const mapStateToProps = global_state => {
    return{
        users:global_state.user.users
    }
}
export default connect(mapStateToProps,action)(UsersComponent)