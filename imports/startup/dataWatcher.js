/**
 * Created by sanyokbig on 22.12.16.
 */

import {Meteor} from 'meteor/meteor';

Meteor.setInterval(()=>{
    Meteor.call('ajax.updatePilots', '5629956', '2R1BGtO434Z9ygT0WbnHBa6Sly6l7wYkLZoGvg0iEhGuAbdrtWl4phvfHN9NYNvv')
},30*60*1000);//Every 30min