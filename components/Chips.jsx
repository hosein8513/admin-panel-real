import React from 'react';

const Chips = ({ setSelectedCategory,selectedcategory,formik}) => {
   
    const handleremoveselectcategory = (id, formik) => {
        setSelectedCategory(old => {
            let newData = old.filter(d => d.id != id)

            const selectedIds = newData.map(d => d.id)
            formik.setFieldValue('category_ids', selectedIds.join('-'))

            return newData
        })
    }

    return (
        <>
        {
            selectedcategory.map(category => (
                <span className='chips_elem' key={category.id}>
                    <i className='fas fa-times text-danger' onClick={() => handleremoveselectcategory(category.id, formik)}></i>
                    {category.value}
                </span>
            ))
        }
        </>
    );
};

export default Chips;