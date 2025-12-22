import React, { useEffect, useState } from 'react';
import Loader from './Loader';
const Table = ({loading, data, datainfo, additionalfield,searchparams,numofpage,children}) => {
    const [inidata, setinidata] = useState(data)
    const [pagedata, setpagedata] = useState([])
    const [currentpage, setcurrentpage] = useState(1)
    const [page, setpage] = useState([])
    const [pagecount, setpagecount] = useState(1)
    const [search, setsearch] = useState("")


    useEffect(() => {
        if (!Number(numofpage)) {
        setpagecount(1)
        setpage([1])
        return
    }
        let pcount = Math.ceil(inidata.length /Number( numofpage))
        setpagecount(pcount)
        let parr = []
        for (let i = 1; i <= pcount; i++) {
            parr = [...parr, i]
        }
        setpage(parr)
    }, [inidata,numofpage])

    useEffect(() => {
        if(!Number(numofpage))
            return
        let start = (currentpage *Number (numofpage)) -  Number (numofpage)
        let end = (currentpage *  Number (numofpage))
        setpagedata(inidata.slice(start, end))

    }, [currentpage, inidata,numofpage])
    useEffect(() => {
        setinidata(data.filter(d => d[searchparams.searchfield].includes(search)))
        setcurrentpage(1)
    }, [search,data])
    return (
        <>
            <div className="row justify-content-between">
                <div className="col-10 col-md-6 col-lg-4">
                    <div className="input-group mb-3 dir_ltr" >
                        <input type="text" className="form-control" placeholder={searchparams.placeholder} onChange={(e) => setsearch(e.target.value)} />
                        <span className="input-group-text" >{searchparams.title}</span>
                    </div>
                </div>
                <div className="col-2 col-md-6 col-lg-4 d-flex flex-column align-items-end">
                   {children}
                </div>
            </div>
          {
          loading?
          <Loader color={'text-primary'}/>
          :data.length >0?(
              <table className="table table-responsive text-center table-hover table-bordered ">
                <thead className="table-secondary">
                    <tr>
                        {datainfo.map(i => (
                            <th key={i.field}>{i.title}</th>
                        ))}
                        {
                            additionalfield ? additionalfield.map((a,index)=>(
                                <th key={index}>{a.title}</th>
                            )) : null
                        }
                    </tr>
                </thead>
                <tbody>
                    {pagedata.map((d, index) => (
                        <tr key={index}>
                            {datainfo.map(i =>
                                <td key={i.field + "_" + index}>{d[i.field]}</td>
                            )}
                            {
                            additionalfield ? additionalfield.map((a,index)=>(
                                <th key={index}>{a.elements(d)}</th>
                            )) : null
                        }
                        </tr>
                    ))}
                </tbody>
            </table>
          ):  <h5 className='text-center text-red-500'>داده ای یافت نشد</h5>}
            {page.length>1?
          <nav aria-label="Page navigation example" className="d-flex justify-content-center">
                <ul className="pagination dir_ltr">
                    <li className="page-item">
                        <span className={`page-link ${currentpage == 1 ? "disabled" : ""}`} aria-label="Previous" onClick={() => {
                            if (currentpage > 1) setcurrentpage(currentpage - 1)
                        }}>
                            <span aria-hidden="true">&raquo;</span>
                        </span>
                    </li>
                    {page.map(pages => (
                        <li key={pages} className="page-item"><span className={`page-link ${currentpage == pages ? "alert-success" : ""}`} onClick={() => setcurrentpage(pages)}>{pages}</span></li>

                    ))}

                    <li className="page-item">
                        <span className={`page-link ${currentpage == pagecount ? "disabled" : ""}`} aria-label="Next" onClick={() => { if (currentpage < pagecount) setcurrentpage(currentpage + 1); }}>
                            <span aria-hidden="true">&laquo;</span>
                        </span>
                    </li>
                </ul>
            </nav>
            :null    
        }
          
        </>
    );
};

export default Table;