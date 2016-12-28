import {Meteor} from 'meteor/meteor';

Meteor.call('ajax.updatePilots', '5629956', '2R1BGtO434Z9ygT0WbnHBa6Sly6l7wYkLZoGvg0iEhGuAbdrtWl4phvfHN9NYNvv')

Meteor.setInterval(()=>{
    Meteor.call('ajax.updatePilots', '5629956', '2R1BGtO434Z9ygT0WbnHBa6Sly6l7wYkLZoGvg0iEhGuAbdrtWl4phvfHN9NYNvv')
},30*60*1000);//Every 30min