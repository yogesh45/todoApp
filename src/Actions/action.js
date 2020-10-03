export const AddTodo = todoState => {
    return{
        type:"Add_Todo",
        todoData:todoState
    }
}

export const AddUser = userState => {
    return {
        type:"Add_User",
        userData:userState
    }
}
