import '../imports/api/pilots.js';
import '../imports/startup/dataWatcher.js';

Meteor.startup(() => {
    ServiceConfiguration.configurations.upsert(
        { service: 'eve' },
        {
            $set: {
                clientId: '89ed2b258e4f4b95a4b49ac918648547',
                loginStyle: 'popup',
                secret: 'Dn1FzdozW4d79cuiLD5tE34jeopjON36ShoYyIQw'
            }
        }
    );
});