import HttpClient from 'utils/HttpClient';

export default {
    getaccestoken(){
        return HttpClient.get('/get/wx/accesstoken');
    },
    getWXACode(data){
        return HttpClient.get('/get/wx/getWXACode', data);
    }
}
