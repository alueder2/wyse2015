Meteor.methods({

  removeStudent: function(user, student){
    Students.update({createdBy: user}, {$pull: {students: {first: student.first, last: student.last, year: student.year}}});
  },
  pushSchoolName: function(user, name, coach, site){
    Students.update({createdBy: user}, { $set: {school: name, coach: coach, site: site}});
  },
  eventsOnHooksInit: function() {},
  toggleLocked: function(val) {
    Students.update({}, { $set: {locked: !val}}, {multi: true});
  },
  updateRoles: function(user, school) {
    Roles.addUsersToRoles(user, ['site']);
  }
});

AdminConfig = {
  name: 'alpha',
  adminEmails: ['admin@wyse.com'],
  collections: {
    SchoolInfo: {},
    Students: {},
    AnswerKeys: {},
    TestSites: {}
  }
};

Hooks.onCreateUser = function (userId) {
  Students.insert({createdBy: userId, students: [], locked: false});
};