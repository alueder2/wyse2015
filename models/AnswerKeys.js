AnswerKeys = new Meteor.Collection('answerKeys');

var Schemas = {};

SimpleSchema.messages({
  "varsityError": "A varsity team must have at least 6 students",
  "testSubject": "Test choices must be different",
  "invalidPassword": "Incorrect site coordinator password"
});


Schemas.answerKeyInfo = new SimpleSchema({
    subject: {
      type: String,
      label: "Subject",
      allowedValues: ['Biology', 'Chemistry', 'CS', 'Engineering', 'English', 'Math', 'Physics']
    },
    testID: {
      type: Number,
      label: "ID (1-Biol, 2-Chem, 3-CS, 4-Engr, 5-Engl, 6-Math, 7-Phys)",
    },
    answers: {
      type: String,
      label: "Answers (One continuous string of answers, 1-5)",
      autoform: {
        afFieldInput: {
          type: "textarea"
        }
       }    
    },
    year: {
      type: String,
      label: "Year"
    },
    contest: {
      type: String,
      label: "Contest",
      allowedValues: ['Regional', 'Sectional', 'State']
    }
});

AnswerKeys.attachSchema(Schemas.answerKeyInfo);

