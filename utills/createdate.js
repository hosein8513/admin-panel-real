import jMoment from 'jalali-moment'


export const createdate = (data,format='jYYYY/jMM/jDD')=>{
return jMoment(data).format(format)
}

export const convertFormDateToMiladi = (date)=>{
    return jMoment(date, 'jD / jM / jYYYY').format('YYYY-M-D')
}