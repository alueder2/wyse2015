/*
 * Uses the 'roles' package to filter what should and shouldn't be exposed to the client
 */

AnswerKeys.permit(['update', 'insert']).ifHasRole('admin').apply();
SchoolInfo.permit(['update', 'insert']).ifLoggedIn().apply();
Students.permit(['update', 'insert']).ifLoggedIn().apply();
TestSites.permit(['insert']).ifLoggedIn().apply();
