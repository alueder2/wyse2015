Template.navigation.events({  // Redirects user to home page after logout
  'click .logout': function(event) {
    event.preventDefault();
    Meteor.logout();
    Router.go('home');
  }
});

Template.navigation.helpers({
  'newStudents': function() {
    var currentUser = Meteor.userId();
    var students = Students.findOne({createdBy: currentUser});
    if (!students)
      return true;
    else
      return false;
  },

  'infoExists': function() {
    var currentUser = Meteor.userId();
    var info = SchoolInfo.findOne({createdBy: currentUser});
    if (info)
      return true;
    else
      return false;
  },

  'active': function(path){   // Used to highlight the tab that is currently being viewed
    if(Router.current().route._path === path)
        return "active";
  },

  'isSiteCoord': function() { 
    var user = Meteor.userId();
    return (Roles.userIsInRole(user, 'site'));
  }
});