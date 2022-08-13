public class HTTP_PostalPinCodeApi {
    @AuraEnabled
    public static Map<String,String> getDetailsOfPincode(String pincode){
        String Name;
        List<String> postOfficeNames = new List<String>();
        Map<String,String> postDistricts = new Map<String,String>();
        String po;
        String district;
        String endPoint = 'https://api.postalpincode.in/pincode/'+pincode;
        Http h = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint(endPoint);
        req.setMethod('GET');
        HttpResponse result = h.send(req);
        Integer code = result.getStatusCode();
        if(code == 200){
            System.debug(result.getBody());
            System.debug(result.getHeaderKeys());
            String res = result.getBody();
            System.JSONParser jp = JSON.createParser(res); //It will initiate the JSONParser class by using we can parse the JSONString dynamically
            while(jp.nextToken()!= null){
                if(jp.getText() == 'Name'){
                    jp.nextToken(); //It will go to the value associated with key as Name
                    po = jp.getText(); //It will assign that value to the variable
                    postOfficeNames.add(po);
                }
                if(jp.getText() == 'District'){
                    jp.nextToken();
                    district = jp.getText();
                    postDistricts.put(po,district);
                }
            }
            System.debug(postOfficeNames);
            System.debug(postDistricts);
        }
        else{
            System.debug('No data found');
        }
        return postDistricts;
    }
    @AuraEnabled
    public static List<String> getPinCode(String cityName){
        List<String> pinCodes = new List<String>();
        String pc;
        String endPoint = 'https://api.postalpincode.in/postoffice/'+cityName;
        Http h = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint(endPoint);
        req.setMethod('GET');
        HttpResponse result = h.send(req);
        Integer code = result.getStatusCode();
        if(code == 200){
            System.debug(result.getBody());
            System.debug(result.getHeaderKeys());
            String res = result.getBody();
            System.JSONParser jp = JSON.createParser(res); //It will initiate the JSONParser class by using we can parse the JSONString dynamically
            while(jp.nextToken()!= null){
                if(jp.getText() == 'Pincode'){
                    jp.nextToken(); //It will go to the value associated with key as Name
                    pc = jp.getText(); //It will assign that value to the variable
                    pinCodes.add(pc);
                }
            }
            System.debug(pinCodes);
        }
        else{
            System.debug('No data found');
        }
        return pinCodes;
    }
}