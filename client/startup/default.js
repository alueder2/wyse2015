Meteor.startup( function(){
    Hooks.init();	// None of the autoform hooks will run unless the Hooks object is initialized on startup
});