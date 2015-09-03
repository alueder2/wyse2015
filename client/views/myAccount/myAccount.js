Template.myAccount.helpers({
	email: function() {
	  return Meteor.user().emails[0].address;
	},

	totalOwed: function() {		// returns total amount owed for their current students registered
	  var user = Meteor.userId();
	  var info = SchoolInfo.findOne({createdBy: user}, {varsity:1, atLarge:1, jv:1});
	  if (info)
	    return ((17 * info.varsity) + (17 * info.atLarge) + (6 * info.jv));
	},

	hasNotPaid: function() {
	  var user = Meteor.userId();
	  var temp = SchoolInfo.findOne({createdBy: user});
	  if (temp) {
	    var paid = temp.paid;
	    return !paid;
	  }

	}
});