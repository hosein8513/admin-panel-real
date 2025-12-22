import { createContext, useState } from "react";

export const Categorycontext = createContext({
    editId: null,
    seteditId: () => { }
})

const CategorycontextContainer = ({ children }) => {
    const [editId, seteditId] = useState(null)
    return (
        <Categorycontext.Provider value={{ editId, seteditId }}>
            {children}
        </Categorycontext.Provider>
    )
}

export default CategorycontextContainer