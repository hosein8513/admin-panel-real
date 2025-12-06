import React from 'react';

const Table = ({data,datainfo,additionalfield}) => {
    
    return (
        <>
            <table className="table table-responsive text-center table-hover table-bordered">
                <thead className="table-secondary">
                    <tr>
                        {datainfo.map(i=>(
                            <th key={i.field}>{i.title}</th>
                        ))}
                        {
                            additionalfield?(
                               <th>{additionalfield.title}</th> 
                            ):null
                        }
                    </tr>
                </thead>
                <tbody>
        {data.map((d)=>(
            <tr key={d.title}>
                {datainfo.map(i=>
                    <td key={i.field+"_"}>{d[i.field]}</td>
                )}
                  {
                            additionalfield?(
                               <th>{additionalfield.elements()}</th> 
                            ):null
                        }
            </tr>
        ))}
                </tbody>
            </table>
            <nav aria-label="Page navigation example" className="d-flex justify-content-center">
                <ul className="pagination dir_ltr">
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Table;