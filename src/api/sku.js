import HttpClient from 'utils/HttpClient';
export default {
    addSku(data){
        return HttpClient.post('/sku/add', data);
    },
    editSku(data){
        return HttpClient.put('/sku/update', data);
    },
    removeSku(data){
        return HttpClient.delete('/sku/delete', data);
    },
    getSkuList(data){
        return HttpClient.get('/sku/list', data);
    }
}
