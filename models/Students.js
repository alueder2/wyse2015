Students = new Meteor.Collection('students');

var Schemas = {};

SimpleSchema.messages({
  "varsityError": "A varsity team must have at least 6 students",
  "testSubject": "Test choices must be different",
  "invalidPassword": "Incorrect site coordinator password"
});



Schemas.studentInfo = new SimpleSchema({
    students: {
      type: Array
    },
    'students.$': {
      type: Object
    },
    'students.$.first': {
      type: String,
      label: "First Name"
    },
    'students.$.last': {
      type: String,
      label: "Last Name"
    },
    'students.$.birthday': {
      type: String,
      label: "Date of Birth",
      optional: true,
      autoform: {
        placeholder: "mm/dd/yyyy"
      }
    },
    'students.$.email': {
      type: String,
      label: "Email",
      optional: true
    },
    'students.$.gender': {
      type: String,
      label: "Gender",
      allowedValues: ['Male', 'Female']
    },
    'students.$.year': {
      type: String,
      label: "Class",
      allowedValues: ['Freshman', 'Sophomore', 'Junior', 'Senior']
    },
    'students.$.address': {
      type: String,
      label: "Street Address",
      optional: true
    },
    'students.$.city': {
      type: String,
      label: "City",
      optional: true
    },
    'students.$.state': {
      type: String,
      label: "State",
      optional: true
    },
    'students.$.zip': {
      type: Number,
      label: "Zip Code",
      optional: true
    },
    'students.$.test1': {
      type: String,
      label: "Test Choice 1",
      allowedValues: ['Biology', 'Chemistry', 'Computer Science', 'Engineering Graphics', 'English', 'Math', 'Physics']
    },
    'students.$.test2': {
      type: String,
      label: "Test Choice 2",
      allowedValues: ['Biology', 'Chemistry', 'Computer Science', 'Engineering Graphics', 'English', 'Math', 'Physics'],
      custom: function() {
        if (this.value === this.field('test1').value)
          return "testSubject";
      }
    },
    'students.$.level': {
      type: String,
      label: "Level",
      allowedValues: ['JV', 'Varsity', 'At-Large']
    },
    'students.$.answers1': {
      type: String,
      optional: true,
      label: "Test 1 Answers (One continuous string of answers, 1-5)",
      autoform: {
        afFieldInput: {
          type: "textarea",
          rows: 4
        }
      }    
    },
    'students.$.answers2': {
      type: String,
      optional: true,
      label: "Test 2 Answers (One continuous string of answers, 1-5)",
      autoform: {
        afFieldInput: {
          type: "textarea",
          rows: 4
        }
      }    
    },
    'students.$.delete': {  // Workaround. Ugly, but the only way for coaches to be able to delete students off their rosters
      type: String,
      optional: true,
      autoform: {
        omit: true
      },
      autoValue: function() {
        return "[Click here to delete]";
      }
    },
    'students.$.school': {  // Also a workaround. Need this in order for the site coordinators to be able to enter answers/sort by school
      type: String,
      optional: true,
      autoform: {
        omit: true
      },
      autoValue: function() {
        var user = Meteor.userId();
        var info = SchoolInfo.findOne({createdBy: user});
        if (info) {
          var school = info.school;
          return school;
        }
      }
    },
    createdBy: {
      type: String,
      autoform: {
        omit: true
      },
      optional: true
    },
    school: {
      type: String,
      optional: true,
      autoform: {
        omit: true
      }
    },
    coach: {
      type: String,
      optional: true,
      autoform: {
        omit: true
      }
    },
    site: {
      type: String,
      optional: true,
      autoform: {
        omit: true
      },
      autoValue: function () {
        var user = this.field('createdBy').value;
        var temp = SchoolInfo.findOne({createdBy: user});
        if (temp)
          return temp.site;
      }
    },
    locked: {
      type: Boolean,
      optional: true,
      autoform: {
        omit: true
      }
    }   
});

Students.attachSchema(Schemas.studentInfo);
