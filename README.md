**Capstone Project: Station X**
Creating a Game Store Web Application

**Manuals:**

MANUALS/User Manual: Describes how a User would use our Application

MANUALS/Admin Manual: Describes how an Admin would use our Application

MANUALS/Deployment Installation Manual: Describes how to Deploy/Install our Application 


**Report:**

REPORT/Final Report: Contains our final report for the project


**Code/Script**: 

server.js file: Creates the main server and defining any dependencies used in the application


**Router:**

router folder: Holds all of the routing done by the application, i.e. page routing, user routing, error routing, etc.


**Views:**

views folder: Holds all of our .ejs files which are used in the express-template engine to render the html and css


**Public/css:**

public/css folder: HOlds all of our .css files that are linked to corresponding .ejs files which make our FrontEnd look good


**Controller:**

controllers/pageController: Holds the page functionailty i.e. rendering/redirecting pages

controllers/errorController: Holds the error functionality i.e. if user tries to access page that does not exist

controllers/newsFeedController: Holds the newsFeed request/response to newsFeed functionality and calls to render the newsFeed page

controllers/inventoryController: Holds the inventory request/response to inventory functionality i.e. get games/merch, get popular items, etc.

controllers/userController: Holds the user request/response to user functionality i.e. create-account, login, get Profile, etc.


**API: **

api folder: Creates API server which acts as an intermediary between the Controller and the Services


**Services:**

services/userService folder: Holds the user functionality and has access to the database to retrieve user data and send back to api

services/inventoryService folder: Holds the inventory functionality and has access to the database to retrieve inventory data and send back to api

services/newsService folder: Holds the newsFeed functionality and has access to the database to retrieve newsFeed data and send back to api

