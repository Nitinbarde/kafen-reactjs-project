let initialState = {
    orderPage: [],
    productPage: [],
    userPage: []
}

export const mainReducer = (state = initialState, action)=>{

    switch(action.type){
        case "order-data" :
            return {...state, orderPage: action.data}
        case "product-data" :
            return {...state, productPage: action.data}
        case "user-data" :
            return {...state, userPage: action.data}
        default: 
            return {...state}
        
    }
}

