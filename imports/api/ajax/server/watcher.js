Meteor.startup(()=>{
    Meteor.call('corps.update-all');
    Meteor.setInterval(()=>{
        Meteor.call('corps.update-all');
    },60*1000);
})