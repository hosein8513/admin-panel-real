const Showinmenu = ({rowdata})=>{
    return(
        <span className={rowdata.showinmenu?'text-green-500':'text-red-500'}>{
            rowdata.showinmenu?"هست":"نیست"
        }</span>
    )
}
export default Showinmenu