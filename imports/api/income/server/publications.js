import {Meteor} from 'meteor/meteor';
import {Income} from '../income.js';

Meteor.publish('income', function incomePublication() {
    this.autorun(()=>{
        if (this.userId) {
            return Income.find({},{
                limit: 50,
                sort: {date: -1}
            });
        }
    });
});