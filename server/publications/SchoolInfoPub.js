Meteor.publish('info', function(){
  var currentUser = this.userId;
  return SchoolInfo.find({ createdBy: currentUser }); // Searches the 'SchoolInfo' database for a model that was created by the current user (coach)
});