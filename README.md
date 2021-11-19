# Capstone : Station X
Creating a Game Store Web Application

Note: If git pull fails when you are on a branch, do a git pull origin branchName which should immediately pull any changes without any problems.

*Remember to do a "npm install" whenever you do a git pull*

Run Services Togeteher

- To run services together, just type the command "npm run dev" which will run all the services and the main server together. 

Run Services Individually  

To run this application and all the services you need to do use 4 vscode terminals:

1.) In one terminal do a npm start, this will start the main server

2.) In the second terminal do command "cd api" and then do command "node main.js" to start API server

3.) In the third terminal do command "cd services" followed with another command "cd userService" and then do command "node main.js" to start user Service server

4.) In the fourth terminal do command "cd services" followed with another command "cd inventoryService" and then do command "node main.js" to start inventory Service server


- In web browser, type in "http://localhost:8050/" to access website
