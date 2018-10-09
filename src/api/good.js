import HttpClient from 'utils/HttpClient';
export default {
    addGood(data){
        return HttpClient.post('/good/add', data);
    },
    editGood(data){
        return HttpClient.put('/good/update', data);
    },
    removeGood(data){
        return HttpClient.delete('/good/delete', data);
    },
    getGoodList(data){
        return HttpClient.get('/good/list', data);
    }
}
