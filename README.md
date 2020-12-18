# QRCode

This is a project made for ELTE IK Software technology course at Eötvös Loránd Tudományegyetem, Faculty of Informatics.

## QRCode - Employee attendance tracker application
This software is made for those who are not working in full-time jobs, but rather are hourly workers with flexible schedule.
After successful registration and login, the users are able to log their current workday in the system via scanning the QR code. The system will store all logged workdays. The users are able to list their past workdays, by months, with the help of the 'View attendance' feature. Another really useful feature is the wage calculator, where the users can calculate their current month's salary in advance, based on the already worked days of the month, and those the user adds that are planned for that month. The users of course can view and edit their profile.

## QRCode - Application design, architecture and technologies
This software consists of a MySQL database, a Java Springboot backend, and an Angular Typescript based frontend. These three parts of the application define the MVC or Modell-View-Controller architecture. The model is the database, and the Entity classes of the backend. The View consists of the Angular frontend, that is the layer that the user can see and interact with, and the correct communication is realized by the rest of the backend, the Repository (defines the CRUD operations on the model objects) and Controller (defines the method that are mapped to different endpoints) classes. The communication between the backend and the frontend is realized by HTTP calls and with JSON objects.

## Contributors
This project was developed by:
Mhyar Kousa
Kunigunda Bagoly
