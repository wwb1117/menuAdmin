import HttpClient from 'utils/HttpClient';
export default {
    addCategory(data){
        return HttpClient.post('/category/add', data);
    },
    getCategoryList(data){
        return HttpClient.get('/category/list', data);
    },
    removeCategory(data){
        return HttpClient.delete('/category/delete', data);
    },
    editCategory(data){
        return HttpClient.put('/category/update', data);
    }
}
