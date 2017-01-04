import {Meteor} from 'meteor/meteor';
import {Pilots} from '../pilots.js';
import {Corps} from '../../corps/corps.js';

Meteor.publish('pilots', function pilotsPublication() {
    if(this.userId) {
        //TODO filter pilots publication
        let myCorps =[];
        Corps.find({
            owner: Meteor.users.findOne(this.userId).services.eve.character.id
        }).forEach((corp)=>{
            myCorps[myCorps.length] = corp.corpID
        });
        console.log(myCorps);
        return Pilots.find({
            corpID :{$in: myCorps}
        });
    }
});