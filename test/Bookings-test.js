const chai = require('chai');
const expect = chai.expect;

import Booking from '../src/Bookings'

describe('Bookings', () => {
  let rooms;
  let bookings;
  let booking;

  beforeEach(() => {
    rooms = [{
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
      number: 4,
      roomType: "single room",
      bidet: false,
      bedSize: "queen",
      numBeds: 1,
      costPerNight: 429.44
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
    }];
    bookings = [
      {
        id: 1572293130156,
        userID: 1,
        date: "2019/11/06",
        roomNumber: 1,
        roomServiceCharges: [ ]
      },
      {
        id: 1572293130159,
        userID: 2,
        date: "2019/11/12",
        roomNumber: 2,
        roomServiceCharges: [ ]
      },
      {
        id: 1572293130159,
        userID: 3,
        date: "2019/10/29",
        roomNumber: 3,
        roomServiceCharges: [ ]
      },
      {
        id: 1572293130159,
        userID: 1,
        date: "2019/11/15",
        roomNumber: 4,
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
        userID: 3,
        date: "2019/11/22",
        roomNumber: 6,
        roomServiceCharges: [ ]
      },
      {
        id: 1572293130160,
        userID: 1,
        date: "2019/11/22",
        roomNumber: 1,
        roomServiceCharges: [ ]
      },
      {
        id: 1572293130160,
        userID: 1,
        date: "2019/12/09",
        roomNumber: 2,
        roomServiceCharges: [ ]
      },
      {
        id: 1572293130160,
        userID: 2,
        date: "2019/12/01",
        roomNumber: 3,
        roomServiceCharges: [ ]
      },
      {
        id: 1572293130160,
        userID: 3,
        date: "2019/11/22",
        roomNumber: 4,
        roomServiceCharges: [ ]
      }];
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
    expect(booking.totalRevenue('2019/11/06')).to.equal(698);
  });

  it('should be able to find the percent of rooms occupied for a date', () => {
    //math floor that ish
    expect(booking.percentOfRoomsOccupied('2019/11/22')).to.equal(50);
  });

  it('should be able to find all customer bookings with an ID', () => {
    expect(booking.findCustomerBookings(2)).to.deep.equal([
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
