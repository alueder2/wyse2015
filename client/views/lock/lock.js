Template.lock.events({  // Toggles checkbox to lock rosters (admin end)
  'change [type=checkbox]': function (){
    var user = Meteor.userId();
    var temp = Students.findOne({createdBy: user});
    var val = temp.locked;
    Meteor.call('toggleLocked', val);
  }
});

Template.lock.helpers({
  'current': function() {
    var user = Meteor.userId();
    var temp = Students.findOne({createdBy: user});
    var val = temp.locked;
    return val;
  }
});