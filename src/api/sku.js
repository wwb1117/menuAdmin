import HttpClient from 'utils/HttpClient';
export default {
    addSku(data){
        return HttpClient.post('/sku/add', data);
    },
    getSkuList(data){
        return HttpClient.get('/sku/list', data);
    }
}
