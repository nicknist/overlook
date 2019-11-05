const chai = require('chai');
const expect = chai.expect;

import spies from 'chai-spies';
import bookings from '../mock-data/booking-data';
import userData from '../mock-data/user-data';
import Manager from '../src/Manager';
import Bookings from '../src/Bookings';

chai.use(spies);

describe('Manager', () => {
  let manager;
  let booking;
  let data = [];
  let fetchSpy;

  beforeEach(() => {
    fetchSpy = chai.spy.on(global, 'fetch', () => {
      return new Promise((resolve, reject) => {
        resolve({message: "Data has been fetched"});
      })
    });
    data = [];
    booking = new Bookings(data, bookings);
    manager = new Manager(booking.findCustomerBookings(1), 1, 'Ben', userData);
  });

  afterEach(() => {
    chai.spy.restore(fetchSpy);
  });

  it('should instantiate with inherited properties', () => {
    expect(manager.customerBookings).to.deep.equal(booking.findCustomerBookings(1));
    expect(manager.id).to.equal(1);
    expect(manager.name).to.equal('ben');
  });

  it('should be instantiated with all the user data', () => {
    expect(manager.customerData).to.deep.equal([
      {
        id: 1,
        name: 'ben firth'
      },
      {
        id: 2,
        name: 'john adams'
      }
    ]);
  });

  it('should inherit Customer methods', () => {
    chai.spy.on(manager, 'bookRoom', () => 'success');
    expect(manager.bookRoom()).to.equal('success');
  });

  it('should inherit filterRooms method', () => {
    chai.spy.on(manager, 'filterRoomsByType', () => 'success');
    expect(manager.filterRoomsByType()).to.equal('success');
  });

  it('should be able to update name', () => {
    manager.updateCustomerID('john');
    expect(manager.name).to.equal('john adams');
  });

  it('should be able to update userID based on a name', () => {
    manager.updateCustomerID('john');
    expect(manager.id).to.equal(2);
    manager.updateCustomerID('ben');
    expect(manager.id).to.equal(1);
  })

  it('should be able to update the current customer bookings', () => {
    manager.updateCustomerID('john');
    manager.updateCurrentCustomerBookings(booking.findCustomerBookings(manager.id));
    expect(manager.customerBookings).to.deep.equal([
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

  it('should be able call use fetch deletebooking method', () => {
    manager.deleteBooking();
    expect(fetchSpy).to.have.been.called(1);
  });
})
