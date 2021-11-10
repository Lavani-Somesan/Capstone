# Capstone
Creating a Game Store Web Application

Note: If git pull fails when you are on a branch, do a git pull origin branchName which should immediately pull any changes without any problems.

Run Application

*Remember to do a "npm install" whenever you do a git pull

To run this application and all the services you need to do use 4 vscode terminals:

1.) In one terminal do a npm start, this will start the main server

2.) In the second terminal do command "cd api" and then do command "node main.js" to start API server

3.) In the third terminal do command "cd services" followed with another command "cd userService" and then do command "node main.js" to start user Service server

4.) In the fourth terminal do command "cd services" followed with another command "cd inventoryService" and then do command "node main.js" to start inventory Service server

*If you don't need to do anything involving the database, you don't need the api or services running

*If you do any actions that require the user service i.e. creating account, logging in, logout, etc. you need to have the api and user service both running

*If you do any actions that require the inventory service i.e. go to the game page, view product, etc. you need to have the api and inventory service both running

*Finally, if you want the application to be running at it's fullest, the you need all 4 to be up and running. 

4.) In web browser, type in "http://localhost:8050/" to access website
