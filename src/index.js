// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';
import Chart from 'chart.js';
import moment from 'moment';
import datepicker from 'js-datepicker';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import Bookings from './Bookings.js';
import Customer from './Customer.js';
import Manager from './Manager.js';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/customer-page.jpg';
import './images/hostel.jpg';
import './images/manager-page.jpg';


let userData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users').then(response => response.json()).then(data => data.users);
let roomData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms').then(response => response.json()).then(data => data.rooms);
let bookingData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings').then(response => response.json()).then(data => data.bookings);

var booking;
var manager;
var currentCustomer;
let currentCustomerID = 30;
let currentDate = findCurrentDate();

Promise.all([userData, roomData, bookingData]).then(data => {
  userData = data[0];
  roomData = data[1];
  bookingData = data[2];
}).then(() => {
    booking = new Bookings(roomData, bookingData);
    $('body').click(checkButtons);
})

function checkButtons(event) {
  if (event.target.id === 'login-button') {
    addErrors();
  }
  if (event.target.id === 'login-button' && checkLogin()) {
    manager = new Manager(booking.findCustomerBookings(currentCustomerID), currentCustomerID, userData.find(data => currentCustomerID === data.id).name, userData);
    changeToManagerPage();
  }
  if (event.target.id === 'login-button' && checkLogin() === false) {
    currentCustomer = new Customer(booking.findCustomerBookings(currentCustomerID), currentCustomerID, userData.find(data => currentCustomerID === data.id).name)
    changeToCustomerPage(currentCustomer.name);
  }
  if (event.target.id === 'logout-button') {
    changeToLoginPage();
  }
  if (event.target.id === 'booking-button') {
    changeToBookingPage();
  }
  if (event.target.id === 'find-date') {
    changeToAvailableRoomsPage();
  }
  if (event.target.id === 'filter-rooms') {
    filterRooms(booking.roomsAvailable(currentCustomer.chosenDate));
  }
  if (event.target.id === 'choose-room') {
    bookRoom();
  }
  if (event.target.id === 'search-customer') {
    checkCustomer();
  }
  if (event.target.id === 'delete-booking') {
    deleteBookingMenu();
  }
  if (event.target.id === 'delete-button') {
    deleteBooking();
  }
}

function changeToManagerPage() {
  $('main').html(`<article class="manager">
    <h2>available rooms:</h2>
    <ul class="room-list">${getRoomsAvailableData(currentDate, '<li>', '</li>')}</ul>
  </article>
  <article class="manager">
    <h2>today's revenue:</h2>
    <p>$${booking.totalRevenue(currentDate)}</p>
  </article>
  <article class="manager chart">
    <h2>percent of rooms occupied:</h2>
    <canvas id="percent-chart"></canvas>
  </article>`);
  $('body').addClass('manager-page');
  $('header').prepend(`<div class="input-box">
    <label for="user-search" class="initial-text">search:</label>
    <input id="user-search" type="text" name="Name Search Input" placeholder="customer name">
    <button id="search-customer" type="button" class="logout-button find-customer" name="Manager search for a customer button">find</button>
    <p id="find-user-check" class="hidden">no customer found</p>
  </div>`);
  $('header').append(`<button id="logout-button" type="button" class="logout-button" name="Logout Button">logout</button>`);
  getPercentChart();
}

function getPercentChart() {
  let roomsAvailable = booking.roomsAvailable(currentDate).length;
  let totalRooms = booking.roomData.length;
  new Chart($('#percent-chart'), {
      type: 'doughnut',
      data: {
        labels: ["Available Rooms", "Occupied Rooms"],
        datasets: [
          {
            backgroundColor: ["#3e95cd", "#8e5ea2"],
            data: [roomsAvailable, (totalRooms - roomsAvailable)]
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 10,
            bottom: 10
          }
        }
      }
  });
}

function getRoomsAvailableData(date, element, closingElement) {
  let string = '';
  booking.roomsAvailable(date).forEach(room => {
    string += `${element}Room #${room.number} is available. It is a ${room.roomType} with a ${room.bedSize.toUpperCase()} bed${closingElement}`
    })
  return string;
}

function changeToCustomerPage(name) {
  $('main').html(`<article class="manager">
    <h2>past bookings:</h2>
    <ul class="room-list">${getPastDataString()}</ul>
  </article>
  <article class="manager upcoming">
    <h2>upcoming bookings:</h2>
    <ul class="room-list">${getUpcomingDataString('<li>', '</li>')}</ul>
  </article>
  <article class="manager">
    <h2>total spent:</h2>
    <p>You have spent $${booking.totalAmountCustomerSpent(currentCustomerID)} at Nister's Tripster for Hipsters</p>
  </article>`);
  $('body').addClass('customer-page');
  $('header').html(`<button id="booking-button" type="button" name="Customer Booking" class="header-booking">new booking</button>
  <h1>welcome ${name}</h1>
  <button id="logout-button" type="button" class="logout-button" name="Logout Button">logout</button>`);
}

function getPastDataString() {
  //in the future -> sort the bookings then put them into a more read-able format
  let string = '';
  booking.findPastCustomerBookings(currentCustomerID, currentDate).forEach(pastBooking => {
    string += `<li>You have booked room #${pastBooking.roomNumber} on ${pastBooking.date}</li>`
  });
  return string;
}

function getUpcomingDataString(element, closingElement) {
  let string = '';
  booking.findUpcomingCustomerBookings(currentCustomerID, currentDate).forEach(upcomingBooking => {
    string += `${element}You have booked room #${upcomingBooking.roomNumber} on ${upcomingBooking.date}${closingElement}`
  });
  return string;
}

function changeToBookingPage() {
  $('main').html(`<article class="initial-login">
    <div id="date-box" class="input-box">
      <label for="date-input" class="initial-text">date:</label>
      <input id="date-input" type="text" name="Date Input" placeholder="date">
    </div>
    <button id="find-date" type="button" class="login-button" name="Find Date for Booking">find date</button>
  </article>`);
  $('header').html(`<h1>welcome ${currentCustomer.name}, choose a date then a room to book</h1>`);
  const picker = datepicker('#date-input', {
    position: 'tl',
    customDays: ['S', 'M', 'T', 'W', 'Th', 'F', 'S'],
    customMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    overlayButton: 'Choose',
    dateSelected: new Date(),
    onSelect: (instance, date) => {
      currentCustomer.chosenDate = (moment(date).format('YYYY/MM/DD'));
    }
  });
  $('.qs-datepicker').css('display', 'inline-block');
  picker.show();
}

function changeToAvailableRoomsPage() {
  let openingElement = `<div><input name="room" type="radio">`;
  if (booking.roomsAvailable(currentCustomer.chosenDate).length === 0) {
    $('main').html(`<article class="initial-login">
    <p>Sorry! There are no rooms available on that date</p>
    <button id="booking-button" type="button" name="Customer Booking" class="login-button go-back">back to new booking</button>
    </article>`);
  } else {
    $('main').html(`<article class="initial-login">
    <label for="date-input" class="initial-text">rooms available:</label>
    <ul class="room-list" id="rooms-available">${getRoomsAvailableData(currentCustomer.chosenDate, openingElement, '</div>')}</ul>
    <div>
      <button id="choose-room" type="button" class="login-button" name="Choose the room you want">book now</button>
      <button id="filter-rooms" type="button" class="login-button" name="Choose the room you want">filter rooms</button>
    </div>
    <button id="booking-button" type="button" name="Customer Booking" class="login-button go-back">back to new booking</button>
    </article>`);
  }
}

function filterRooms(roomsAvailable) {
  let string = '';
  currentCustomer.filterRoomsByType(roomsAvailable).forEach(room => {
    string += `<div><input name="room" type="radio">Room #${room.number} is available. It is a ${room.roomType} with a ${room.bedSize.toUpperCase()} bed</div>`
  })
  $('#rooms-available').html(`${string}`);
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

function bookRoom() {
  let text = $('input[name="room"]:checked').closest('div').text()
  let split = text.split(' ');
  let roomNumber = split[1][1];
  if (split[1][2]) {
    roomNumber += split[1][2];
  }
  currentCustomer.bookRoom(currentCustomer.chosenDate, parseInt(roomNumber));
  changeToCustomerPage(currentCustomer.name);
  $('header').append(`<br><h1>Congrats! You Booked the Room!</h1>`);
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

function checkCustomer() {
  let search = $(event.target.previousElementSibling).val()
  if (findCustomer(search)) {
    let newCustomer = findCustomer(search);
    currentCustomerID = newCustomer.id;
    currentCustomer = new Customer(booking.findCustomerBookings(newCustomer.id), newCustomer.id, newCustomer.name);
    changeToCustomerPage(currentCustomer.name);
    $('.upcoming').append(`<button id="delete-booking" type="button" class="login-button" name="Delete Booking For Customer">delete booking</button>`);
    return;
  }
  $('#find-user-check').removeClass('hidden');
  $('#user-search').addClass('error-box');
}

function findCustomer(text) {
  let upperText = text.charAt(0).toUpperCase() + text.slice(1);
  if (manager.customerData.find(customer => customer.name.includes(upperText))) {
    return manager.customerData.find(customer => customer.name.includes(upperText));
  }
  return false;
}

function findCurrentDate() {
  //eventually make this dynamic and grab the current date with a Date object
  return '2019/11/02';
}

function deleteBookingMenu() {
  $('main').html(`<article class="initial-login">
  <label for="delete-booking-input" class="initial-text">upcoming bookings:</label>
  <ul class="room-list" id="delete-booking-input">${getUpcomingDataString('<div><input name="booking" type="radio">', '</div>')}</ul>
  <button id="delete-button" type="button" name="Delete Customer Booking" class="login-button go-back">delete booking</button>
  </article>`);
}

function deleteBooking() {
  let text = $('input[name="booking"]:checked').closest('div').text();
  let split = text.split('#');
  var date;
  let roomNumber = split[1][0];
  if (split[1][1]) {
    roomNumber += split[1][1];
  }
  if (split[1].charAt(15)) {
    date = split[1].slice(6, 16);
  } else {
    date = split[1].slice(5, 15);
  }
  let id = booking.returnBookingNumber(currentCustomerID, date, parseInt(roomNumber));
  console.log(id.id);
  // currentCustomer.bookRoom(currentCustomer.chosenDate, parseInt(roomNumber));
  // changeToCustomerPage(currentCustomer.name);
  // $('header').append(`<br><h1>Congrats! You Booked the Room!</h1>`);
}
