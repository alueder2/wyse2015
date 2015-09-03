Meteor.publish('students', function(){
  if (Roles.userIsInRole(this.userId, 'site')) {
    var temp = TestSites.findOne({coordinator: this.userId});	// If a site coordinator, then return all info from that site
    if (temp) {
      var foo = temp.site;
      return Students.find({site: foo});
    }
  }
  else 
    return Students.find({ createdBy: this.userId });	// Otherwise, just return the coach's students
});

