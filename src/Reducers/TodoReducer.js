const initialState = {
    'todos':[]
}

const addTodo = (state = initialState,action) => {
    switch (action.type) {
        case 'Add_Todo': {
            return(
                {
                    ...state,
                    todos:[...action.todoData]
                }
            )
        }
        default : {
            return state
        }
    }
}

export default addTodo;