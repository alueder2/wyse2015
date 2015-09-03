// Define App Constants

if (Meteor.App) {
  throw new Meteor.Error('Meteor.App already defined? see client/lib/constants.js');
}

Meteor.App = {
  NAME: 'Meteor Boilerplate',
  DESCRIPTION: 'A boilerplate for meteorjs projects http://matteodem.github.io/meteor-boilerplate/'
};

/*
 * As soon as a user logs in, the app checks if the email is the already set up admin email. 
 * This can be changed to whatever, "admin@wyse.com" is just a placeholder
 */

  Hooks.onLoggedIn = function () {
    if (Meteor.user()) {
      if (Meteor.user().emails[0].address != "admin@wyse.com")
        Router.go('home');
      else
      Router.go('/admin');
    }
  };

  /*
   * Ensures that as soon as somebody logs out, they are redirected to the home page
   */

  Hooks.onLoggedOut = function() {
    Router.go('home');
  };

  /*
   * Main block of code containing options set for the Admin page, accessible only by the admin email (from above)
   */

AdminConfig = {
  name: 'WYSE 2015',
  adminEmails: ['admin@wyse.com'],
  collections: {
    SchoolInfo: {
      icon: 'star',
      color: 'green',
      tableColumns: [
       {label: 'Coach', name: 'coach' },
       {label: 'School', name: 'address'},
       {label: 'City', name: 'city'},
       {label: 'State', name: 'state'},
       {label: 'Zip', name: 'zip'},
       {label: 'Phone', name: 'phone'},
       {label: 'Email', name: 'email'},
       {label: 'Enrollment', name: 'enrollment'},
       {label: 'Division', name: 'division'},
       {label: 'Site', name: 'site'},
       {label: '# Varsity', name: 'varsity'},
       {label: '# At-Large', name: 'atLarge'},
       {label: '# JV', name: 'jv'},
       {label: 'Accepted Disclaimer?', name: 'disclaimer'},
       {label: 'Paid?', name: 'paid'},
      ]
    },
    Students: {
      color: 'orange',
      icon: 'book',
      tableColumns: [
        {label: 'School', name: 'school'},
        {label: 'Coach', name: 'coach'},
        {label: 'Test Site', name: 'site'},
        {label: 'Created By', name: 'createdBy'}
      ]
    },
    AnswerKeys: {
      color: 'red',
      icon: 'check-square',
      tableColumns: [
        {label: 'Year', name: 'year'},
        {label: 'Contest', name: 'contest'},
        {label: 'Subject', name: 'subject'}
      ]
    },
    TestSites: {
      color: 'yellow',
      tableColumns: [
        {label: 'School', name: 'site'},
        {label: 'Coordinator ID', name: 'coordinator'}
      ]
    }
  },
  dashboard: {
    homeUrl: '/admin'
  }
};

/*
 * Explained in the routes.js file, but these are the additional functionalities implemented so that the rosters
 * are able to be locked on the client, as well as every student's answers are visible to the admin
 */

AdminDashboard.addCollectionItem(function (collection, path) {
  if (collection === 'Students') {
    return {
      title: 'Lock Rosters',
      url: path + '/lock'
    };
  }
});

AdminDashboard.addCollectionItem(function (collection, path) {
  if (collection === 'Students') {
    return {
      title: 'View Answers',
      url: path + '/viewAnswers'
    };
  }
});

  /*
  * Hooks that need to be in place, in order for the Autoform to submit correctly and then redirect to the home page
  */

AutoForm.hooks({
  enterInfo: {
    after: {
      insert: function(error, result) {
        if (error) {
        console.log("Insert Error:", error);
        } else {
          Router.go("home");
        }
      },

    }
  },

  updateInfo: {
    after: {
      update: function(error, result) {
        if (error) {
        console.log("Update Error:", error);
        } else {
          Router.go("home");
        }
      }
    }
  },

  enterStudentInfo: {
    after: {
      'update-pushArray': function(error, result) {
        if (error)
          console.log("Update Error:", error);
        else {
          var user = Meteor.userId();
          var temp = SchoolInfo.findOne({createdBy: user});
          var name = temp.school;
          var coach = temp.coach;
          var site = temp.site;
          Meteor.call('pushSchoolName', user, name, coach, site); // The update functions can ONLY be called on the server, Meteor.call is necessary here.
                                                                  // The corresponding function is defined on the server side code
        }
      }
    }    
  },

  /*
   * This block of code lets a normal user validate their site coordinator privileges, thus giving them access to the functionalities that come with it
   */

  siteCoordValidation: {
    after: {
      insert: function(error, result) {
        if (error) {
          console.log(error);
        }
        else {
          var user = Meteor.userId();
          var school = this.insertDoc.site;
          Meteor.call('updateRoles', user, school);
          Router.go('home');
        }
      }
    }
  },

  answerEntry: {
    after: {
      'update-pushArray': function(error, result) {
        if (error) {
        console.log("Update Error:", error);
        } else {
          Router.go("home");
        }
      }
    }
  }
});

Meteor.subscribe('info');   // The counterpart to Meteor.publish. The server must publish and the client must subscribe
Meteor.subscribe('students');