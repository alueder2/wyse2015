TestSites = new Meteor.Collection('testSites');

var Schemas = {};

SimpleSchema.messages({
  "varsityError": "A varsity team must have at least 6 students",
  "testSubject": "Test choices must be different",
  "invalidPassword": "Incorrect site coordinator password"
});


Schemas.testSites = new SimpleSchema({
    site: {
      type: String,
      allowedValues: ['BBCHS', 'Bishop McNamara', 'Lincoln Way North']
    },
    coordinator: {
      type: String,
      autoform: {
        omit: true
      },
      autoValue: function() {
          return Meteor.userId();
      }
    },
    password: {
      type: String,
      custom: function() {
        if (this.value != "wyse2015")
          return "invalidPassword";
      },
      autoform: {
        afFieldInput: {
          type: "password"
        }
      }
    }
});

TestSites.attachSchema(Schemas.testSites);