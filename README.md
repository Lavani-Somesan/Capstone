# Capstone
Creating a Game Store Web Application

Note: If git pull fails when you are on a branch, do a git pull origin branchName which should immediately pull any changes without any problems.

Run Application

*Remember to do a "npm install" whenever you do a git pull

To run this application you need to do use 3 vscode terminals:

1.) In one terminal do a npm start

2.) In the second terminal do command "cd api" and then do command "node main.js" to start API server

3.) In the third terminal do command "cd userService" and then do command "node main.js" to start userService server

* All 3 must be running any database actions to work i.e. creating user, getting user, etc.
* 
4.) In web browser, type in "http://localhost:8050/" to access website

*For creating a user, navigate to route /create-account and enter in form, and click submit. The console should give you a log of the progess of the request. You should also be able to view your created user in the MongoDB database.
