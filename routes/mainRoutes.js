/*
 * All routes that are needed to navigate between views in the SPA. 
 * To make it easier to render pages, one can return a 'data' function to the view so that the page being loaded immediately has data at hand.
 */

Router.route('/enterInfo');
Router.route('/viewStudents');
Router.route('/viewSchoolInfo');
Router.route('/siteCoord');

Router.route('/updateInfo', function() {
  this.render('updateInfo', {
    data: function() {
      var currentUser = Meteor.userId();
      return SchoolInfo.findOne({createdBy: currentUser});
    }
  })
});

Router.route('/enterStudentInfo');

Router.route('/', function() {
  this.render('home');
}, {
  name: 'home'
});

Router.route('/myAccount');

Router.route('/lock', {
  path: AdminDashboard.path('/Students/lock'),  // Used to create an additional custom view for the Admin page
  controller: 'AdminController',
  onAfterAction: function () {
    Session.set('admin_title', 'Students');
  }
});

Router.route('/viewAnswers', {
  path: AdminDashboard.path('/Students/viewAnswers'), // Used to create an additional custom view for the Admin page
  controller: 'AdminController',
  onAfterAction: function () {
    Session.set('admin_title', 'Students');
  }
});

Router.route('/enterAnswers', {

});

Router.route('/enterAnswers/:_id', {  // :_id is used to identify each Mongo Collection's unique id that is created alongside it. This allows one to return an item based on the current id
  name: 'answerPage',
  template: 'enterAnswers',
  data: function() {
    var current = this.params._id;
    var data = Students.findOne({}, {students: { $elemMatch: {_id: current}}}); 
  }
});

/* navbar, main layout, etc. */

Router.configure({
  layoutTemplate: 'main',
});

var requireLogin = function() { 
  if (! Meteor.user()) {  // If user is not logged in render landing page
   Router.go('home'); 
 } else { // If user is logged in render whatever route was requested
   this.next(); 
 }
}

Router.onBeforeAction(requireLogin, {except: ['home']});  // Prevents a user who is not registered/logged in from accessing pages they should not be