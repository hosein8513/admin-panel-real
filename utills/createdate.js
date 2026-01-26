import jMoment from 'jalali-moment'


export const createdate = (data)=>{
return jMoment(data).format('jYYYY/jMM/jDD')
}

export const convertFormDateToMiladi = (date)=>{
    return jMoment(date, 'jD / jM / jYYYY').format('YYYY-M-D')
}