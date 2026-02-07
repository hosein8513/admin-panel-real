import React, { useEffect, useState } from 'react';
import { getFewerProducts, toggleNotification } from '../../src/services/product';
import { SuccessAlert } from '../../utills/Alert';
import ActionIcon from '../../components/ActionIcon';
import Loader from '../../components/Loader';

const Producttable = () => {
    const [fewerProduct, setFewerProduct] = useState([])
    const [loading, setLoading] = useState(false)

    const handleGetFewerProducts = async () => {
        setLoading(true)
        const res = await getFewerProducts()
        setLoading(false)
        if (res.status == 200) {
            const products = res.data.data
            products.length > 0 ? setFewerProduct(products) : setFewerProduct([])
        }
    }

    const handleTurnOffNotification = async(id)=>{
        const res = await toggleNotification(id)
        if(res.status == 200){
            SuccessAlert("عملیات با موفقیت انجام شد")
            setFewerProduct(old=>old.filter(p=>p.id != id))
        }
    }

    useEffect(()=>{
        handleGetFewerProducts()
    },[])
    return (
    <div className="col-12 col-lg-6">
      <p className="text-center mt-3 text-dark">محصولات رو به اتمام</p>
      {loading ? (<Loader colorClass={"text-primary"}/>) 
      : fewerProduct.length === 0 
      ? (
        <strong className="text-primary">فعلا محصول رو به اتمامی وجود ندارد</strong>
      ) 
      : (
        <table className="table table-responsive text-center table-hover table-bordered no_shadow_back_table font_08">
          <thead className="table-secondary">
            <tr>
              <th>#</th>
              <th>دسته</th>
              <th>عنوان</th>
              <th>وضعیت</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {
              fewerProduct.map(p=>(
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.categories[0].title}</td>
                <td>{p.title}</td>
                <td>{p.stock === 0 ? (
                  <span className="text-danger">پایان یافته</span>
                ) : `رو به اتمام : (${p.stock})` }</td>
                <td>
                  <ActionIcon icon="fas fa-eye-slash text-danger" pTitle="update_product_notification" title="نادیده گرفتن"
                  onClick={()=>handleTurnOffNotification(p.id)}
                  />
                </td>
              </tr>
              ))
            }
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Producttable;