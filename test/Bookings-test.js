const chai = require('chai');
const expect = chai.expect;

import rooms from '../mock-data/rooms-data';
import bookings from '../mock-data/booking-data';
import Booking from '../src/Bookings';

describe('Bookings', () => {
  let booking;

  beforeEach(() => {
      booking = new Booking(rooms, bookings);
  });

  it('should instantiate with room data', () => {
    expect(booking.roomData).to.equal(rooms);
  });

  it('should instantiate with booking data', () => {
    expect(booking.bookingData).to.equal(bookings);
  });

  it('should be able to return the rooms available for a date', () => {
    expect(booking.roomsAvailable('2019/11/15')).to.deep.equal([
      {
        number: 1,
        roomType: "residential suite",
        bidet: true,
        bedSize: "queen",
        numBeds: 1,
        costPerNight: 358.4
      },
      {
        number: 2,
        roomType: "suite",
        bidet: false,
        bedSize: "full",
        numBeds: 2,
        costPerNight: 477.38
      },
      {
        number: 3,
        roomType: "single room",
        bidet: false,
        bedSize: "king",
        numBeds: 1,
        costPerNight: 491.14
      },
      {
        number: 5,
        roomType: "single room",
        bidet: true,
        bedSize: "queen",
        numBeds: 2,
        costPerNight: 340.17
      },
      {
        number: 6,
        roomType: "junior suite",
        bidet: true,
        bedSize: "queen",
        numBeds: 1,
        costPerNight: 397.02
      }
    ]);
  });

  it('should be able to find the total revenue for a date', () => {
    expect(booking.totalRevenue('2019/11/06')).to.equal(1038);
  });

  it('should be able to find the percent of rooms occupied for a date', () => {
    expect(booking.percentOfRoomsOccupied('2019/11/22')).to.equal(50);
  });

  it('should be able to find all past customer bookings with an ID and current date', () => {
    expect(booking.findPastCustomerBookings(2, '2019/11/10')).to.deep.equal([
      {
        id: 1572293130160,
        userID: 2,
        date: "2019/11/06",
        roomNumber: 5,
        roomServiceCharges: [ ]
      }
    ]);
  });

  it('should be able to find all upcoming customer bookings with an ID and current date', () => {
    expect(booking.findUpcomingCustomerBookings(2, '2019/11/10')).to.deep.equal([
      {
        id: 1572293130159,
        userID: 2,
        date: "2019/11/12",
        roomNumber: 2,
        roomServiceCharges: [ ]
      },
      {
        id: 1572293130160,
        userID: 2,
        date: "2019/12/01",
        roomNumber: 3,
        roomServiceCharges: [ ]
      }
    ]);
  });

  it('should be able to find all customer bookings with an ID', () => {
    expect(booking.findCustomerBookings(2, '2019/11/10')).to.deep.equal([
      {
        id: 1572293130159,
        userID: 2,
        date: "2019/11/12",
        roomNumber: 2,
        roomServiceCharges: [ ]
      },
      {
        id: 1572293130160,
        userID: 2,
        date: "2019/11/06",
        roomNumber: 5,
        roomServiceCharges: [ ]
      },
      {
        id: 1572293130160,
        userID: 2,
        date: "2019/12/01",
        roomNumber: 3,
        roomServiceCharges: [ ]
      }
    ]);
  });

  it('should be able to find the total amount a customer has spent', () => {
    expect(booking.totalAmountCustomerSpent(3)).to.equal(1317);
  });

})
