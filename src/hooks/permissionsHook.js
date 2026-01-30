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
    const isAdmin = roles.findIndex(r=>r.title === 'admin') >-1

    return isAdmin || (typeof(title)=='object'?hasOneOfPer(permissions,title):permissions.findIndex(p => p.title.includes(title)) > -1)

}

const hasOneOfPer = (permissions,titles)=>{
    for(const title of titles){
        if(permissions.findIndex(p=>p.title.includes(title))>-1)return true
    }
    return false
    
    }