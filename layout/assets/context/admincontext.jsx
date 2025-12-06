import {
    createContext,
    useState
} from "react";

export const Admincontext = createContext({
    showSidebar: false,
    setshowsidebar: () => {}
})
  
const Admincontextcontainer = ({
    children
}) => {
    const [showSidebar, setshowsidebar] = useState(false)

    return ( <Admincontext.Provider value={{showSidebar,setshowsidebar}}>
       {children}

        </Admincontext.Provider>
    )
}

export default Admincontextcontainer