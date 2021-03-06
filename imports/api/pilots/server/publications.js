import {Meteor} from 'meteor/meteor';
import {Pilots} from '../pilots.js';
import {Corps} from '../../corps/corps.js';

Meteor.publish('pilots', function pilotsPublication() {
    this.autorun(()=>{
        if (this.userId) {
            let myCorps = [];
            Corps.find({
                owner: Meteor.users.findOne(this.userId).services.eve.character.id
            }).forEach((corp) => {
                myCorps[myCorps.length] = corp.corpID
            });
            return Pilots.find({
                corpID: {$in: myCorps}
            });
        }
    });
});