<p align="center">
  <img width="100" height="100" src="https://media.glassdoor.com/sqll/1172252/atlantbh-squarelogo-1508334484095.png">
</p>

# Bid.ba 

A web auction platform for vintage items developed during [Atlantbh](https://www.atlantbh.com/) Internship (October 2021 - February 2022).
Monthly tasks were tracked via [Trello](https://trello.com/) and the development progress was presented at the end of each month. I have collaborated with a QA intern and a dedicated mentor to ensure the successful implementation of the platform. <br/><br/> 
Check it out --> <a href="https://bidba.herokuapp.com/" target="_blank">https://bidba.herokuapp.com</a> <br/><br/> 

## Tech stack for frontend

- **React** - Open-source front-end JavaScript library for building user interfaces or UI components
- **Typescript** - A strongly typed programming language that builds on JavaScript, giving better tooling at any scale
- **Heroku** - A platform as a service (PaaS) that enables developers to build, run, and operate applications in the cloud (used for hosting)

<p>
<img align="left" width="100" height="100" src="https://nextsoftware.io/files/images/logos/main/reactjs-logo.png">
<img align="left" width="100" height="100" src="https://miro.medium.com/max/816/1*TpbxEQy4ckB-g31PwUQPlg.png">
<img align="left" width="100" height="100" src="https://gluonhq.com/wp-content/uploads/2018/05/heroku-logotype-vertical-purple-253x300@2x.png">
</p><br/><br/><br/><br/>  

<br/><br/>
## Starting the app
**Inside** the directory, you can run several commands:

### **`npm start`**
Starts the development server. You can open http://localhost:3000/ in your browser after the command is run, to make and view edits just refresh the page. <br/>
### **`npm build`** 
Bundles the app into static files for production. The app is ready to be deployed. <br/> 
### **`npm test`** 
Starts the test runner. <br/> 
### **`npm eject`** 
Removes this tool and copies build dependencies, configuration files and scripts into the app directory. If you do this, you can't go back!<br/>

## Main functionality

- Navbar and footer with static pages
- Login and registration with field validations
- Landing page 
- Single product page with distiction for seller, buyer and a guest user
- Bidding process with amount validation
- Shop page:
- - Filtering by category, subcategory, price range
- - Sorting options
- - Grid/List view switch
- - Pagination
- - Search by product name
- - 'Did you mean...?' functionality
- User profile page with 4 tabs:
- - Edit Profile
- - Bids
- - Sell
- - Settings with profile deactivation
- Adding new product for auction
- Payment processing with Stripe
- Deployment
