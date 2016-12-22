import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { HTTP } from 'meteor/http';

import { Pilots} from './pilots.js';

Meteor.methods({
    'ajax.updatePilots'(id, vcode) {
	if (!Meteor.isServer)
	    return;
	check(id, String);
	check(vcode, String);

	// Make sure the user is logged in before inserting a pilot
	if (!this.userId) {
	    throw new Meteor.Error('not-authorized');
	}

	HTTP.get('https://api.eveonline.com/corp/MemberTracking.xml.aspx', {params: {extended: true, keyID: id, vCode: vcode}}, function (error, response) {
	    let xml = xml2js.parseStringSync(response.content);
	    let pilots = xml.eveapi.result[0].rowset[0].row;
	    for (let i = 0; i < pilots.length; i++) {
		let pilot = pilots[i].$,
		    entry = Pilots.findOne({pilotId: +pilot.characterID});
		if (entry) {
		    Pilots.update({
			pilotId: pilot.charactedID
		    }, {
			$set: {
			    location: pilot.location ? pilot.location : 'Неизвестно',
			    shipType: pilot.shipType,
			    joined: pilot.startDateTime,
			    logon: pilot.logonDateTime,
			    logoff: pilot.logoffDateTime
			}
		    })
		} else {
		    Pilots.insert({
			pilotId: +pilot.characterID,
			pilotName: pilot.name,
			location: pilot.location ? pilot.location : 'Неизвестно',
			shipType: pilot.shipType,
			joined: pilot.startDateTime,
			logon: pilot.logonDateTime,
			logoff: pilot.logoffDateTime,
			kills: 0,
			losses: 0,
			klratio: 0,
			points: 0,
			income: 0
		    }, (error, result) => {
			if (error) {
			    console.log(error);
			}
		    });
		}
	    }
	});
    },
    'collection.drop'() {
	Pilots.remove({});
    }
});
