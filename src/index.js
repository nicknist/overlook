// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

// console.log('This is the JavaScript entry file - your code begins here.');

let userData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users').then(response => response.json()).then(data => data.users);
let roomData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms').then(response => response.json()).then(data => data.rooms);
let bookingData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings').then(response => response.json()).then(data => data.bookings);

Promise.all([userData, roomData, bookingData]).then(data => {
  userData = data[0];
  roomData = data[1];
  bookingData = data[2];
}).then(() => {
  // console.log(userData);
  // console.log(roomData);
  // console.log(bookingData);
})

$('body').click(checkButtons);

function checkButtons(event) {
  if (event.target.id === 'login-button') {
    addErrors();
  }
  if (event.target.id === 'login-button' && checkLogin()) {
    changeToManagerPage();
  }
  if (event.target.id === 'login-button' && checkLogin() === false) {
    changeToCustomerPage();
  }
  if (event.target.id === 'logout-button') {
    changeToLoginPage();
  }
}

function changeToManagerPage() {
  $('main').html(`<article class="manager">
    <h2>available rooms:</h2>
  </article>
  <article class="manager">
    <h2>today's revenue:</h2>
  </article>
  <article class="manager">
    <h2>percent of rooms occupied:</h2>
  </article>`);
  $('body').addClass('manager-page');
  $('header').prepend(`<div class="input-box">
    <label for="user-search" class="initial-text">search:</label>
    <input id="user-search" type="text" name="Name Search Input" placeholder="customer name">
  </div>`);
  $('header').append(`<button id="logout-button" type="button" class="logout-button" name="Logout Button">logout</button>`);
}

function changeToCustomerPage() {
  $('main').html(`<article class="manager">
    <h2>past bookings:</h2>
  </article>
  <article class="manager">
    <h2>upcoming bookings:</h2>
  </article>
  <article class="manager">
    <h2>total spent:</h2>
  </article>`);
  $('body').addClass('customer-page');
  $('header').prepend(`<button id="booking-button" type="button" name="Customer Booking">new booking</button>`);
  $('header').append(`<button id="logout-button" type="button" class="logout-button" name="Logout Button">logout</button>`);
}

function changeToLoginPage() {
  $('main').html(`<article class="initial-login">
    <div id="username-box" class="input-box">
      <label for="username-input" class="initial-text">username:</label>
      <input id="username-input" type="text" name="UserName Input" placeholder="username">
    </div>
    <div id="password-box" class="input-box">
      <label for="password-input" class="initial-text">password:</label>
      <input id="password-input" type="text" name="Password Input" placeholder="password">
    </div>
    <button id="login-button" type="button" class="login-button" name="Welcome Button">welcome</button>
  </article>`);
  $('body').removeClass('manager-page');
  $('body').removeClass('customer-page');
  $('header').html(`<h1>NISTER'S TRIPSTER FOR HIPSTERS</h1>`);
  $('#username-box').append(`<p id="username-check" class="hidden">please enter a valid username</p>`);
  $('#password-box').append(`<p id="password-check" class="hidden">please enter a valid password</p>`);
}

function checkLogin() {
  //will later need to check if customer# is equal to 1 through 100.... that's a future nick problem
  if ($('#username-input').val() === 'manager' && $('#password-input').val() === 'overlook2019') {
    removeErrors();
    return true;
  } else if ($('#username-input').val() === 'customer' && $('#password-input').val() === 'overlook2019') {
    removeErrors();
    return false;
  } else {
    removeErrors();
    addErrors();
  }
}

function removeErrors() {
  if ($('#username-input').val() === 'manager' || $('#username-input').val() === 'customer') {
    $('#username-input').removeClass('error-box');
    $('#username-check').addClass('hidden');
  }
  if ($('#password-input').val() === 'overlook2019') {
    $('#password-input').removeClass('error-box');
    $('#password-check').addClass('hidden');
  }
}

function addErrors() {
  if ($('#username-input').val() !== 'manager' && $('#username-input').val() !== 'customer') {
    $('#username-input').addClass('error-box');
    $('#username-check').removeClass('hidden');
  }
  if ($('#password-input').val() !== 'overlook2019') {
    $('#password-input').addClass('error-box');
    $('#password-check').removeClass('hidden');
  }
}
