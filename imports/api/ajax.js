import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { HTTP } from 'meteor/http';

import { Pilots} from './pilots.js';

Meteor.methods({
    'ajax.getPilots'(id, vcode) {
	if(!Meteor.isServer)return;
	check(id, String);
	check(vcode, String);

	// Make sure the user is logged in before inserting a pilot
	if (!this.userId) {
	    throw new Meteor.Error('not-authorized');
	}
	HTTP.get('https://api.eveonline.com/corp/MemberTracking.xml.aspx', {params: {extended: true, keyID: id,vCode: vcode}},function(error, response){
	    let xml = xml2js.parseStringSync(response.content);
	    let pilots = xml.eveapi.result[0].rowset[0].row;
	    for (let i=0;i<pilots.length;i++) {
		let pilot = pilots[i].$;
		Pilots.insert({
		    pilotId: pilot.characterID,
		    pilotName: pilot.name,
		    shipType: pilot.shipType
		});
	    }
	});
    },
    'collection.drop'(){
	Pilots.remove({});
    }
});
