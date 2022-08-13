public with sharing class REST_Consumer_to_AntraTestOrg {
    // This example practiced for username-password OAuth token 
    /*
        endpoint :  https://login.salesforce.com/services/oauth2/token
        method   :  POST
        body     :  grant_type = password, 
                    client_id = 3MVG9pRzvMkjMb6maC72hEqGoXOKXkCsEVLPE_L5Klh321d4P6XSjFYbeGzIJpRJOyitiWb8ZgIf.0qvgXndO
                    client_secret = BED33834496C813E5F76286B04EF115FC8F2BE8FC1F091DC158F9CB79B3FCB84
                    username = 	muralikrish.sfdc@salesforce.com
                    password

    */
    public static string access_token;
    public static void getAccessToken(){
        Http h = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://login.salesforce.com/services/oauth2/token');
        req.setMethod('POST');
        String body = 'grant_type=password';
        body = body+'&client_id=3MVG9pRzvMkjMb6maC72hEqGoXOKXkCsEVLPE_L5Klh321d4P6XSjFYbeGzIJpRJOyitiWb8ZgIf.0qvgXndO';
        body = body + '&client_secret=BED33834496C813E5F76286B04EF115FC8F2BE8FC1F091DC158F9CB79B3FCB84';
        body = body + '&username=muralikrish.sfdc@salesforce.com';
        body = body + '&password=antra@7070';
        req.setBody(body);
        HttpResponse response = h.send(req);
        if(response.getStatusCode() == 200){
            System.JSONParser jp = JSON.createParser(response.getBody());
            while(jp.nextToken()!= null){
                if(jp.getText()=='access_token'){
                    jp.nextToken();
                    access_token = jp.getText();
                }
            }
        }
        System.debug(access_token);
    }
    /*
        endpoint    :  https://antra-1c-dev-ed.my.salesforce.com/services/apexrest/Accounts
        method      :  GET
        oAuth Token : access_token
    */
    public static void getAccounts(){
        List<Account> accList;
        Http h = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://antra-1c-dev-ed.my.salesforce.com/services/apexrest/Accounts');
        req.setHeader('Authorization', 'OAuth '+access_token);
        req.setMethod('GET');
        HttpResponse response = h.send(req);
        if(response.getStatusCode() == 200){
            //System.debug(response.getBody());
            accList = (List<Account>)JSON.deserialize(response.getBody(), List<Account>.class);
            //System.debug(accList);
        }
        for(Account acc : accList){
            System.debug(acc.Name);
        }
    }
}
