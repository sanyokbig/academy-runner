import {Meteor} from 'meteor/meteor';
import {HTTP} from 'meteor/http';

//5629956 - 2R1BGtO434Z9ygT0WbnHBa6Sly6l7wYkLZoGvg0iEhGuAbdrtWl4phvfHN9NYNvv
//5628472 - CK79QwXMhv9hfDS49yrljZBrTtmNlI33WZkyy5uzJQWOlLs0OJ7IsgqZlIRPMclj

export const Ajax = Ajax || {};

Ajax.getApiInfo = (keyID, vCode)=>{
    return new Promise((resolve,reject)=>{
        HTTP.get('https://api.eveonline.com/account/APIKeyInfo.xml.aspx', {
            params: {keyID,vCode}
        },(err,res)=>{
            if(err) {
                reject(err)
            } else {
                resolve(xml2js.parseStringSync(res.content));
            }
        });
    });
};

Meteor.methods({

        // HTTP.get('https://api.eveonline.com/corp/MemberTracking.xml.aspx', {
        //         params: {
        //             extended: true,
        //             keyID: id,
        //             vCode: vcode
        //         }
        //     }, function (error, response) {
        // $.ajax({
        //     url: 'https://api.eveonline.com/account/APIKeyInfo.xml.aspx',
        //     type: 'GET',
        //     data: {keyID:this.id, vCode:this.vcode},
        //     success: (function(v){
        //         //Ключ рабочий, читаем
        //         var keyinfo=v.getElementsByTagName("key")[0];
        //         this.type=$(keyinfo).attr('type');
        //         this.mask=$(keyinfo).attr('accessMask');
        //         this.expires=$(keyinfo).attr('expires');
        //         this.success=true;
        //         if(this.type=="Corporation") {
        //             var row=v.getElementsByTagName("row")[0];
        //             this.corpid=$(row).attr('corporationID');
        //             this.corpname=$(row).attr('corporationName');
        //         }
        //         callback();
        //     }).bind(this),
        //     error: (function(jqXHR, textStatus, errorThrown) {
        //         //Ключ неверный
        //         var errorinfo=jqXHR.responseXML.getElementsByTagName("error")[0];
        //         this.success=false;
        //         this.error=$(errorinfo).attr('code');
        //         this.errortext=$(errorinfo).text();
        //         callback();
        //     }).bind(this)
        // });
})