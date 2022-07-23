# CMIS-3122-RAD
### Student Registration Website

#### How to Setup the Project
##### This project uses Node.js & Express Framework. Therefore make sure Node.js is installed beforehand

1. Create a [Cloudinary](https://cloudinary.com/) account. Set the product type to Programmable Media for image and video API.
2. Create a .env file at the root of the project folder. The following variables must be included in the .env file
   - DATABASE_URL -> url to access the database on the machine
   - DATABASE_USER -> database user profile (ex: root )
   - DATABASE_NAME -> specify a name for the database (ex: studentregistration)
   - SESSION_SECRET -> specify a secret string used by the session
   - ADMIN_TIMEOUT -> admin timeout period in milliseconds ( set this value to about 5 minutes or more)
   - CLOUDINARY_CLOUD_NAME -> cloud name specified when creating the cloudinary account
   - CLOUDINARY_KEY -> cloudinary key
   - CLOUDINARY_SECRET -> cloudinary secret
   (all the cloudinary based values can be found when you login to your cloudinary account-> dashboard)
3. Run the followin command at the root of the project folder to install all the required packages
```
npm i
```
4. Go to database->initial_Setup->seeder.js file and change the adminUserName & adminPassword variable values to your preference.
5. Run the following command to setup the database and the respective tables with data
```
npm run databaseSetup
```
6. Before starting the server install the nodemon node package so that the server is automatically restarted whenever a change is made to the code
```
npm i nodemon
```
7. To start up the server after setting the database up run the following
```
npm run dev
```
