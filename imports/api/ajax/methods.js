import {Meteor} from 'meteor/meteor';
import {HTTP} from 'meteor/http';

//5629956 - 2R1BGtO434Z9ygT0WbnHBa6Sly6l7wYkLZoGvg0iEhGuAbdrtWl4phvfHN9NYNvv
//5628472 - CK79QwXMhv9hfDS49yrljZBrTtmNlI33WZkyy5uzJQWOlLs0OJ7IsgqZlIRPMclj

export const Ajax = Ajax || {};

Ajax.getKeyInfo = (keyID, vCode)=>{
    return new Promise((resolve,reject)=>{
        HTTP.get('https://api.eveonline.com/account/APIKeyInfo.xml.aspx', {
            params: {keyID,vCode}
        },(err,res)=>{
            if(err) {
                reject(err)
            } else {
                let parsed = xml2js.parseStringSync(res.content);
                resolve(parsed);
            }
        });
    });
};

Ajax.getPilots = (keyID, vCode)=>{
    return new Promise((resolve, reject)=>{
        HTTP.get('https://api.eveonline.com/corp/MemberTracking.xml.aspx',{
            params: {keyID,vCode,extended:true}
        },(err,res)=>{
            if(err) {
                reject(err);
            } else {
                resolve(xml2js.parseStringSync(res.content));
            }
        });
    });
};

Ajax.getKills = ()=>{

};

Ajax.getIncome = ()=>{

}