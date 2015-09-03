SchoolInfo = new Meteor.Collection('info');

var Schemas = {};

SimpleSchema.messages({
  "varsityError": "A varsity team must have at least 6 students",
  "testSubject": "Test choices must be different",
  "invalidPassword": "Incorrect site coordinator password"
});


Schemas.schoolInfo = new SimpleSchema({
    coach: {
        type: String,
        label: "Coach Name"
    },
    school: {
        type: String,
        label: "School Name"
    },
    address: {
        type: String,
        label: "School Street Address"
    },
    city: {
        type: String,
        label: "City"
    },
    state: {
        type: String,
        label: "State"
    },
    zip: {
        type: Number,
        label: "Zip Code",
        min: 10000,
        max: 99999
    },
    phone: {
        type: String,
        label: "Coach Phone Number",
        min: 7,
        max: 14
    },
    email: {
        type: String,
        label: "Coach Email Address"
    },
    enrollment: {
        type: Number,
        label: "School Enrollment"
    },
    division: {
        type: String,
        label: "School Division",
        allowedValues: ['Division 300', 'Division 700', 'Division 1500', 'Division Unlimited'],
        autoform: {
          afFieldInput: {
            type: "select"            
          },
        }
    },
    site: {
        type: String,
        label: "Regional Site",
        allowedValues: ['BBCHS', 'Bishop McNamara', 'Lincoln Way North']
    },
    varsity: {
        type: Number,
        label: "# of Varsity Members",
        max: 14,
        custom: function () {
          if (this.value) {
            if (this.value < 6)
              return "varsityError";
          }
        }
    },
    atLarge: {
        type: Number,
        label: "# of At-Large Members",
        max: 5
    },
    jv: {
        type: Number,
        label: "# of JV Members"
    },
    disclaimer: {
      type: Boolean,
      label: "By checking the box, I hereby give the University of Illinois at Urbana-Champaign permission to use the information provided for publicity and educational purposes. I confirm that I have my students' permission to provide the University of Illinois with their information.",
      autoform: {
        afFieldInput: {
          type: "boolean-checkbox"
        }
      }
    },
    paid: {
      type: Boolean,
      optional: true,
      autoValue: function() {
        var content = this.field("paid");
        if (!content.isSet)
          return false;
      }
    },
    createdBy: {
      type: String,
      autoValue: function() {
        if (this.isInsert)
          return Meteor.userId();
      }
    }
});

SchoolInfo.attachSchema(Schemas.schoolInfo);
