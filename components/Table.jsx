import React, { useEffect, useState } from 'react';
let numofpage = 2
const Table = ({ data, datainfo, additionalfield }) => {
    const [inidata,setinidata] = useState(data)
    const [pagedata, setpagedata] = useState([])
    const [currentpage, setcurrentpage] = useState(1)
    const [page, setpage] = useState([])
    const [pagecount, setpagecount] = useState(1)


    useEffect(() => {
        let pcount = Math.ceil(inidata.length / numofpage)
        setpagecount(pcount)
        let parr = []
        for (let i = 1; i <= pcount; i++) {
            parr = [...parr, i]
        }
        setpage(parr)
    }, [inidata])

    useEffect(() => {
        let start = (currentpage * numofpage) - numofpage
        let end = (currentpage * numofpage)
        setpagedata(inidata.slice(start, end))

    }, [currentpage,inidata])
    return (
        <>
            <table className="table table-responsive text-center table-hover table-bordered">
                <thead className="table-secondary">
                    <tr>
                        {datainfo.map(i => (
                            <th key={i.field}>{i.title}</th>
                        ))}
                        {
                            additionalfield ? (
                                <th>{additionalfield.title}</th>
                            ) : null
                        }
                    </tr>
                </thead>
                <tbody>
                    {pagedata.map((d,index) => (
                        <tr key={index}>
                            {datainfo.map(i =>
                                <td key={i.field + "_" + index}>{d[i.field]}</td>
                            )}
                            {
                                additionalfield ? (
                                    <th>{additionalfield.elements()}</th>
                                ) : null
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
            <nav aria-label="Page navigation example" className="d-flex justify-content-center">
                <ul className="pagination dir_ltr">
                    <li className="page-item">
                        <span className={`page-link ${currentpage ==1 ?"disabled":""}`}  aria-label="Previous" onClick={()=>{
                            if (currentpage > 1) setcurrentpage(currentpage - 1)
                        }}>
                            <span aria-hidden="true">&raquo;</span>
                        </span>
                    </li>
                    {page.map(pages => (
                        <li key={pages} className="page-item"><span className={`page-link ${currentpage == pages ? "alert-success":""}`}  onClick={()=>setcurrentpage(pages)}>{pages}</span></li>

                    ))}

                    <li className="page-item">
                        <span className={`page-link ${currentpage ==pagecount ?"disabled":""}`}  aria-label="Next" onClick={()=>{if (currentpage < pagecount) setcurrentpage(currentpage + 1);}}>
                            <span aria-hidden="true">&laquo;</span>
                        </span>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Table;