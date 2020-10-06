import { getEntity } from '../../globals/Entity'



export const AddEntity = (entity) => {
    return {
        entity: entity,
        type: "ADD_ENTITY",
        id: entity.id
    }
}
export const SubEntity = (entity) => {
    return {
        entity: entity,
        type: "SUB_ENTITY",
        id: entity.id
    }
}
export const RemoveEntity = (entity) => {
    return {
        entity: entity,
        type: "REMOVE_ENTITY",
        id: entity.id
    }
}
export const Empty = () => {
    return {
        type: "EMPTY",
    }
}
