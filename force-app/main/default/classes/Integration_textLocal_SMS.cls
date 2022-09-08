public with sharing class Integration_textLocal_SMS {
    
    public String apikey;
    public static void sendSMS(){
        Http h = new Http();
        HttpRequest req = new HttpRequest();
        String endPoint = 'https://api.textlocal.in/send?apiKey=NTg3NDc1MzA0ZDUwNjM1YTc0Mzg3NjM4NTM2YjQ5NGE=';
        endPoint += '&numbers=917207304948';
        endPoint += '&sender=CHVMKrishna';
        endPoint += '&message=Hi This is Murali Krishna';
        req.setEndpoint(endpoint);
        req.setMethod('POST');

        HttpResponse response = h.send(req);
        Integer code = response.getStatusCode();
        if(code == 200){
            System.debug('status '+ response.getStatus());
            System.debug('body '+ response.getBody());
            System.debug('Header Keys '+ response.getHeaderKeys());
        }
        else{
            System.debug('Integration failed');
        }

    }
}
