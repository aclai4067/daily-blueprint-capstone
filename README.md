# NSS Full-Stack Capstone - "Daily Blueprint"

## Technologies Used
* C#/ASP.NET Core
* Microsoft SQL Server for databse
* HTML5, CSS, Javascript
* [SASS 4.14.1](https://sass-lang.com/) for all customized styling
* [React 16.13.1](https://reactjs.org/) for core app functionality
* [ReactStrap 8.4.0](https://reactstrap.github.io/) for navbar and modals
* [Firebase 7.16.0](https://firebase.google.com/) for authentication
* [MomentJS 2.27.0](https://momentjs.com/) for date formatting
* [React-FontAwesome 0.1.11](https://github.com/FortAwesome/react-fontawesome) for icons

## Description
> Daily Blueprint in an application focused on facilitating team stand-ups, as well as employee organization and time management. Users must log in to access the app content.  New users are prompted to create a profile and must be assigned to a team by their manager or team lead.

> The home page displays the logged-in user's dashboard with cards for the three main categories: priorities, to dos, and tagged.  The user can click the "new" button and fill out a form to create a new To Do or Priority item.  On hover of a To Do or Priority, buttons will appear to edit the item or tag other users involved with that task.  To mark the task as complete, the user simply clicks the check-box at the start of the line.  If the user has been tagged by someone else, that task will display in the Tagged section.

> The teams page displays the priorities for all employees assigned to a given team.  If the user is a part of multiple teams, they will have a drop-down box to switch their team view.  The "make primary" button allows the user to set their current team view as the default.  If the user is a team lead, they will also have an "edit team" button which opens a modal form to add or remove any user within the organization.

> The pomodoro timer allows the user to set up timed work and break intervals to assist with their focus throughout the day.  When the user clicks the play button, the cycle begins and will continue until stopped, paused, or all sessions have been completed. The pause button allows the user to stop the timer, while preserving their place in the current session. The stop button will stop and reset the timer to the beginning. At the end of a work session, a chime plays and an alert briefly displays notifying the user that it is time for a break.  At the end of a break session, a beep plays and an alert briefly displays notifying the user that it is time to resume their work. Tracker circles at the bottom of the page reflect how many total session are included in the full Pomodoro cycle.  The circles contain a check mark for completed session, a dot for an in progress session, or are solid for remaining sessions.  The user can click "settings" to edit their session lengths as well as the number of work sessions to complete in a cycle.

## Screenshots
Logged Out View
![Landing Page For Logged Out User](https://raw.githubusercontent.com/aclai4067/daily-blueprint-capstone/master/screenshots/dbpLogin.png)

Logged In Home
![Landing Page For Logged In User - Home](https://raw.githubusercontent.com/aclai4067/daily-blueprint-capstone/master/screenshots/dbpDashboard.png)

To Do or Priority Create/Edit Modal
![Form to Create or Edit To Dos and Priorities](https://raw.githubusercontent.com/aclai4067/daily-blueprint-capstone/master/screenshots/dbpCreateEditToDoModal.png)

Tag Users
![Modal to Tag Other Users in To Dos or Priorities](https://raw.githubusercontent.com/aclai4067/daily-blueprint-capstone/master/screenshots/dbpTagModal.png)

Team View
![Team Priorities Page](https://raw.githubusercontent.com/aclai4067/daily-blueprint-capstone/master/screenshots/dbpTeamView.png)

Edit Team - Team Lead View Only
![Team Leads May Add or Remove Team Members](https://raw.githubusercontent.com/aclai4067/daily-blueprint-capstone/master/screenshots/dbpEditTeamModal.png)

Pomodoro Info
![What is Pomodoro? Modal](https://raw.githubusercontent.com/aclai4067/daily-blueprint-capstone/master/screenshots/dbpPomodoroInfoModal.png)

Pomodoro Active
![Pomodoro Timer Counting Down Work Session](https://raw.githubusercontent.com/aclai4067/daily-blueprint-capstone/master/screenshots/dbpPomodoro.png)

Pomodoro Edit Mode
![Pomodoro Timer Settings Can be Adjusted](https://raw.githubusercontent.com/aclai4067/daily-blueprint-capstone/master/screenshots/dpbPomodoroEdit.png)


## Contributors
[Ashley Claiborne](https://github.com/aclai4067)