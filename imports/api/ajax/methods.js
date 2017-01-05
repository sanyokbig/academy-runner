import {Meteor} from 'meteor/meteor';
import {HTTP} from 'meteor/http';
import {Income} from '../income/income.js';

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

Ajax.getIncomePage = (params)=>{
    return new Promise((resolve, reject)=>{
        HTTP.get('https://api.eveonline.com/corp/WalletJournal.xml.aspx',{
            params
        },(err,res)=>{
            if(err) {
                reject(err);
            } else {
                let inclist = xml2js.parseStringSync(res.content).eveapi.result[0].rowset[0].row,
                    lastID=0, done;
                for(let inc of inclist) {
                    inc = inc.$;
                    if(inc.refTypeID == '85') {
                        if(!Income.findOne({refID: +inc.refID})) {
                            //Запись свежая, добавляем
                            lastID = +inc.refID;
                            Income.insert({
                                refID: +inc.refID,
                                pilotID: +inc.ownerID2,
                                amount: +inc.amount,
                                date: new Date(inc.date)
                            });
                        } else {
                            //Запись уже есть, вырубаемся
                            done=true;
                        }
                    }
                }
                if(done) {
                    console.log('Enough');
                    resolve();
                } else {
                    params.fromID = lastID;
                    console.log('Moar '+lastID);
                    new Promise(()=>{
                        Ajax.getIncomePage(params);
                    }).then(resolve());
                }
            }
        });
    });
};

Ajax.getIncome = (keyID, vCode)=>{
    return new Promise((resolve, reject)=>{
        let params = {
            keyID,
            vCode,
            accountKey: 1000,
            rowCount: 100,
            fromID: 0
        };
        Ajax.getIncomePage(params);
    })
};