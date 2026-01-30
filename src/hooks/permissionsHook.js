import {
    useSelector
} from "react-redux"

export const useHasPermission = (title) => {
    const user = useSelector(state => state.userReducer.data)
    const roles = user?.roles ||[]
    let permissions = []
    for (const role of roles) {
        permissions = [...permissions, ...role.permissions]
    }

    return permissions.findIndex(p => p.title.includes(title)) > -1

}