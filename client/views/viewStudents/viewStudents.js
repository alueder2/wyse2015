Template.viewStudents.helpers({   // Returns array of students specific to that coach
  'foo': function() {
    var temp = Students.findOne({});
    if (temp)
      return temp.students;
  },
  settings: function () {   // Supplementary settings function for the "reactive-table" function
      return {
          rowsPerPage: 15,
          showFilter: true,
          fields: [
            {key:'school', label: 'School'},
            {key: 'first', label: 'First Name'},
            {key: 'last', label: 'Last Name'},            
            {key:'year', label: 'Year'},
            {key:'test1', label: 'Test Choice 1'},
            {key:'test2', label: 'Test Choice 2'},
            {key:'', label: '', tmpl: Template.viewStudents_operations}
          ]
      };
  }
});