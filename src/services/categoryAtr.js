import httpservice from "./httpservice"

export const getCategoryAtr = (id) => {
return httpservice(`/admin/categories/${id}/attributes`,'get')
}