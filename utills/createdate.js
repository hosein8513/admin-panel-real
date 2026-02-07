import jMoment from 'jalali-moment'


export const createdate = (data, format = 'jYYYY/jMM/jDD') => {
  if (!data) {
    return "---"; // یا مقدار پیش‌فرض دیگر
  }
  
  // اگر تاریخ معتبر نیست
  if (data === '0000-00-00 00:00:00' || data === '0000-00-00') {
    return "---";
  }
  
  try {
    const momentDate = jMoment(data);
    
    // بررسی معتبر بودن تاریخ
    if (!momentDate.isValid()) {
      return "---";
    }
    
    return momentDate.format(format);
  } catch (error) {
    console.error("Error converting date:", error, data);
    return "---";
  }
}

export const convertFormDateToMiladi = (date)=>{
    return jMoment(date, 'jD / jM / jYYYY').format('YYYY-M-D')
}