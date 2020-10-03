
const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }

        return JSON.parse(serializedState);
    }
    catch (e) {
        return undefined;

    }
}
const initState = {

    addedEntities: [],
    totalPrice: 0
}
const getState = () => {
    let state = loadState()
    return state === undefined ? initState : state
}


const Cart = (state = getState(), action) => {


    switch (action.type) {
        case "ADD_ENTITY":
            {


                let previouslyAddedEntity = state.addedEntities.find(existingEntity => existingEntity.id === action.entity.id);

                if (previouslyAddedEntity) {
                    previouslyAddedEntity.quantity += 1;

                    return {
                        ...state,
                        totalPrice: state.totalPrice + parseFloat(previouslyAddedEntity.fields.price.value)
                    }

                }
                else {


                    action.entity.quantity = 1;
                    return {
                        ...state,
                        addedEntities: [...state.addedEntities, action.entity],
                        totalPrice: state.totalPrice + parseFloat(action.entity.fields.price.value)
                    }
                }
                break;
            }

        case "SUB_ENTITY":
            {
                let previouslyAddedEntity = state.addedEntities.find(existingEntity => existingEntity.id === action.entity.id)

                if (previouslyAddedEntity) {

                    if (previouslyAddedEntity.quantity == 1) {

                        let newEntityList = state.addedEntities.filter(existingEntity => existingEntity.id !== previouslyAddedEntity.id)
                        return {
                            ...state,
                            addedEntities: newEntityList,
                            totalPrice: state.totalPrice - parseFloat(previouslyAddedEntity.fields.price.value)
                        }

                    }

                    previouslyAddedEntity.quantity -= 1;
                    return {
                        ...state,
                        totalPrice: state.totalPrice - parseFloat(previouslyAddedEntity.fields.price.value)
                    }


                }
                break;
            }
        case "REMOVE_ENTITY":
            {
                let entityToRemove = state.addedEntities.find(existingEntity => existingEntity.id === action.entity.id)

                if (entityToRemove) {



                    let newEntityList = state.addedEntities.filter(existingEntity => existingEntity.id !== entityToRemove.id)
                    return {
                        ...state,
                        addedEntities: newEntityList,
                        totalPrice: state.totalPrice - parseFloat(entityToRemove.fields.price.value * entityToRemove.quantity)
                    }


                }
                break;
            }

    }
    return state;

}
export default Cart;