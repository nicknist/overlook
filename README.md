# Nister's Tripster for Hipsters

## Welcome to my Mod 2 'Overlook' Project

Have you ever wanted to go on a hostel adventure, but needed a website to book your room? LOOK NO FURTHER!

## Setup

Feel free to pull down this repo, run 'npm install'

To verify that it is setup correctly, run `npm start` in your terminal. Go to `http://localhost:8080/`. Enter `control + c` in your terminal to stop the server at any time.

For Logging in:
-To be a customer, use 'customer' + any # 1-50 with the password of 'overlook2019'
-To be a manager, use 'manager' with the password of 'overlook2019'


### Wins

This project had a lot of ups and downs. I would say some of the best things that were accomplished: 
1. Implementing spies in testing for fetch requests and also for an inherited child class
1. Focusing on CSS/SCSS in order to have a more design forward mind when coding for the user. There are definitely some UI/UX fixes that can happen, but compared with my older projects this one looks the most clean.
1. I was able to test all of my methods within classes first, which was a positive thing to get into the workflow of testing first.
1. I was very pleased and proud that I implemented a few libraries effectively. I used 'Moment.js' to implement dates and parsing those to be more readable, 'datepicker' to be able to have a date picked on the booking page, and 'Chart.js' in order to add the occupancy doughnut chart.

### Challenges

Some of the bigger challenges of this project:
1. Figuring out what to prioritize based on different points of the project was a difficulty. I would push hard on an iteration and then take a step back to tie up some of the loose ends that didn't happen along the way.
1. Spies and figuring out if they were testing what I hoped they were testing was an interesting struggle. It's hard to know if your mockup is exactly what you want to test, but with the help of devs in the field and upper module students the tests are solid that use spies.

### Future Iterations

If given more time:
1. I would have created the functionality to have a drop down on the booking menu for customers to be able to filter by any of the room options (bed type, bidet or not, etc.). 
1. I would have done more of the manual testing for accessibility. The audit in chrome tools has 100%, but I would've liked to dive deeper into some of the manual tests.
1. There's a bug that needs the conditional logic looked at. Basically, if you type 'customer' into the input the error message won't show up, but it won't move onto the next page. It's because my conditional logic for errors checks if 'manager' or 'customer' is inlcuded in that input text box.


### ScreenShots

