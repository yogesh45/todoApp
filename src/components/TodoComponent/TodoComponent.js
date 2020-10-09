import React, { useContext, useEffect, useState } from 'react';
import { Table, Space, Button } from 'antd';
import 'antd/dist/antd.css';
import TodoForm from '../PopupComponent/TodoForm';
import { connect} from 'react-redux';
import * as action from '../../Actions';
import {ModelContext} from '../AppComponent'
const { Column } = Table;
const TodoComponent = (props) => {
    const [modelState, setModelState] = useContext(ModelContext);
    const [todos,setTodos] = useState(props.todos);
    const [showModel, setShowModel] = useState(false);

    /**
     * UseEffect to reRender component when todo changes
     */
    useEffect(() => {
        setTodos(props.todos)
    },[props.todos])

    /**
     * Function to edit a todo
     * @function onEditClick
     * @param {*} flag 
     */

    const onEditClick = (key, evt) => {
        setShowModel(true)
        setModelState({...modelState, index:key,popupType:'todo'})
    }

    /**
     * Function to show the model to add a new todo
     * @function createTodo
     * @param boolean - Flag
     */
    const createTodo = (flag) => {
        setShowModel(flag)
        setModelState({...modelState, index:null})
    }

    /**
     * Function to delete the todo
     * @function deleteTodo
     * @param index - idx to delete the index
     */

    const deleteTodo = (key) => {
        let tempTodos = [...props.todos];
        let idx = tempTodos.findIndex(e => e.key == key)
        tempTodos.splice(idx,1);
        props.AddTodo(tempTodos)
    }

    /**
     * Function to hide the form
     * @function cancelClick
     */
    const cancelClick = () => {
        setShowModel(false)
    }
    return(
        <div className='todo_component'>
        <Button onClick={ () => createTodo(true)}>Create Todo</Button>
        <br/>
        <br/>
        <Table dataSource={todos}>
            <Column title="Todo" dataIndex="todo" key="todo" />
            <Column title="Action" key="action"
                render={(text, record) => (
                    <Space size="middle">
                        <a onClick={ (e) => onEditClick(record.key,e)}>Edit</a>
                        <a onClick={ (e) => deleteTodo(record.key,e)}>Delete</a>
                    </Space>
                )}
            />
        </Table>
        {
            showModel ? <TodoForm cancelClick={cancelClick} /> : ''
        }
        </div>
    )
}

const mapStateToProps = global_state => {
    return{
        todos:global_state.todo.todos
    }
}
export default connect(mapStateToProps,action)(TodoComponent)