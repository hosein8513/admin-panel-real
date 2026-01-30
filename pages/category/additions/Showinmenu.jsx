const Showinmenu = ({rowdata})=>{
    return(
        <span className={rowdata.show_in_menu?'text-green-500':'text-red-500'}>{
            rowdata.show_in_menu?"هست":"نیست"
        }</span>
    )
}
export default Showinmenu