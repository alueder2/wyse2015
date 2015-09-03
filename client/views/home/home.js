Template.home.helpers({		// Finds the first name of the current user and displays it on the home page
	currentUser: function() {
	  var user = Meteor.userId();
	  var string = SchoolInfo.findOne({createdBy: user});
	  if (string) {
	    var name = string.coach;
	    return name.split(" ")[0];
	  }
	}
});