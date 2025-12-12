import jMoment from 'jalali-moment'


export const createdate = (data)=>{
return jMoment(data).format('jYYYY/jMM/jDD')
}