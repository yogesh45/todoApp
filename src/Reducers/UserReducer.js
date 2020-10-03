const initialState = {
    'users':[]
}

const addUser = (state = initialState,action) => {
    switch (action.type) {
        case 'Add_User': {
            return(
                {
                    ...state,
                    users:[...action.userData]
                }
            )
        }
        default : {
            return state
        }
    }
}

export default addUser;