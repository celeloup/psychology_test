# 🩺 Psychology test web application

#### Table of contents
[What is it ?](#what-is-it-)  
[Launch](#launch)  
[Stack & Architecture](#stack--architecture)  
[Features](#features)

<p align="center"><img src="/assets/screenshot_landing.png" width="650"/></p>

## What is it ?

A personnal project for the end of study memoire of a friend studying psychology. The app is a simple questionnaire to collect data for a **_psychology study_**, with the possibility for the user to retrieve its results or continue where they left off easily by referencing their email. It also features an *admin view*, displaying all the answers, some basic statistics and the possibility to download the data in `.xlxs` format for future processing. The questionnaire is actually 4 different questionnaires with slightly different questions, given to the user based on its ID. Each questionnaire also features a MBTI test.

<p align="center"><img src="/assets/mbti_example.gif" width="650"/></p>


## Stack & Architecture

This app was built using a **MERN** (MongoDB, Express, React.js, Node.js) stack and a **MVC** (Model View Controler) architecture.

- React JS 17
- Node 16
- Express 4
- Mongoose 5
- Dotenv 8
- Axios
- …

The data is hosted on [MongoDB Cloud Atlas](https://www.mongodb.com/cloud/atlas/lp/try4) and the app was hosted on [Heroku](https://www.heroku.com/). As of today, since the study was closed years ago, the app is no longer available online.

## Launch

⚠️ The app requires some environnement variables (the database credentials for example). ⚠️

```bash
# in /.env
MONGODB_URI=YOUR_URL_HERE

# And in /client/.env
REACT_APP_ADMIN_PASSWORD=password
REACT_APP_ADMIN_USERNAME=admin
```

Start by installing all the dependencies.

```bash
npm install ; cd client ; npm install ; cd ..
```

Launch the back server.

```bash
npm start
```

Once it runs with no errors, you can start the client.

```bash
cd client ; npm start
```

## Features

- Responsive design
- Landing page with popup to log in
- Form with a simple but modern design, error handling and user feedback
- Randomisation of the data : each user is given one of the 4 questionnaires based on its ID to guarantee homogenous data
- Modular result page displaying one of the 16 possible result
- Admin view with all the results
<p align="center">
<img src="/assets/drag_drop_example.gif" height="360"/>
<img src="/assets/result_page_example.gif" height="360"/> 
</p>
