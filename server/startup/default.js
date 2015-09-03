Meteor.startup(function() {
  roles = Roles.getAllRoles();    // Finds all of the current roles currently in the Meteor project
  roles.forEach(function(doc){
    try {
      Roles.createRole('site'); // If 'site' already exists, then catch exception. Only successful workaround, but it works
    }
    catch (e) {
      return;
    }
  });
});