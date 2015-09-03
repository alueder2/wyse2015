  Template.enterStudentInfo.helpers({
    foo: function() {
      var user = Meteor.userId();
      return Students.findOne({createdBy: user});
    },
    showStudent: function() {
      var user = Meteor.userId();
      var ret = Students.findOne({createdBy: user});
      if (ret)
        return ret.students;
    },
    areStudents: function() { // Checks to see if there is a students array in existence
      var currentUser = Meteor.userId();
      var students = Students.findOne({createdBy: currentUser});
      if (students) {
        var temp = students.students;
        if (!temp)
          return false;
        else
          return true;
      }
    },
    studentCount: function() {
      var currentUser = Meteor.userId();
      var temp = Students.findOne({createdBy: currentUser});
      if (temp)
        return temp.students.length;
    },
    studentMax: function() {    // Returns how many students in total the coach has registered
      var currentUser = Meteor.userId();
      var temp = SchoolInfo.findOne({createdBy: currentUser}, {varsity: 1, atLarge:1, jv:1});
      if (temp)
        return (temp.varsity + temp.atLarge + temp.jv);
    },
    notLocked: function() {     // Function that checks if rosters are currently locked or not
      var currentUser = Meteor.userId();
      var temp = Students.findOne({createdBy: currentUser});
      if (temp) {
        var ret = temp.locked;
        return (!ret);
      }
    },
    test: function() {
      var user = Meteor.userId();
      var temp = Students.findOne({createdBy: user});
      if (temp)
        return temp.students;
    },
    settings: function () {   // Supplement to the "reactive-table" package
        return {
            rowsPerPage: 15,
            showFilter: true,
            fields: [
              {key: 'first', label: 'First Name'},
              {key: 'last', label: 'Last Name'},
              {key:'year', label: 'Year'},
              {key:'birthday', label:'Birthday'},
              {key:'gender', label:'Gender'},
              {key:'email', label:'Email'}, 
              {key:'address', label:'Address'},
              {key:'gender', label:'Gender'}, 
              {key:'city', label:'City'},
              {key: 'state', label: 'State'},
              {key: 'zip', label: 'Zip'},
              {key: 'level', label: 'Level'},
              {key:'test1', label: 'Test Choice 1'},
              {key:'test2', label: 'Test Choice 2'},
              {key: 'delete', label: 'Delete', cellClass: 'delete'}
            ]
        };
    }
  });

  Template.enterStudentInfo.events({    // Function to be able to delete a student from a roster (on the coach's end)
    'click .reactive-table tbody tr': function (event) {
      event.preventDefault();
      var student = this;
      var user = Meteor.userId();
      // checks if the actual clicked element has the class `delete`
      if (event.target.className == "delete") {
        Meteor.call('removeStudent', user, student);
      }
    }
  });