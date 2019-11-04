const chai = require('chai');
const expect = chai.expect;

import Customer from '../src/Customer';

describe('Customer', () => {
  let customerBookings;
  let customer;

  beforeEach(() => {
    customerBookings = [
      {
        id: 1572293130156,
        userID: 1,
        date: "2019/11/06",
        roomNumber: 1,
        roomServiceCharges: [ ]
      },
      {
        id: 1572293130159,
        userID: 1,
        date: "2019/11/12",
        roomNumber: 2,
        roomServiceCharges: [ ]
      },
      {
        id: 1572293130159,
        userID: 1,
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
        userID: 1,
        date: "2019/11/06",
        roomNumber: 5,
        roomServiceCharges: [ ]
      },
      {
        id: 1572293130160,
        userID: 1,
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
        userID: 1,
        date: "2019/12/01",
        roomNumber: 3,
        roomServiceCharges: [ ]
      },
      {
        id: 1572293130160,
        userID: 1,
        date: "2019/11/22",
        roomNumber: 4,
        roomServiceCharges: [ ]
      }];
      customer = new Customer(customerBookings, 1, 'Ben');
  });

  it('should instantiate with their bookings data', () => {
    expect(customer.customerBookings).to.deep.equal([
      {
        id: 1572293130156,
        userID: 1,
        date: "2019/11/06",
        roomNumber: 1,
        roomServiceCharges: [ ]
      },
      {
        id: 1572293130159,
        userID: 1,
        date: "2019/11/12",
        roomNumber: 2,
        roomServiceCharges: [ ]
      },
      {
        id: 1572293130159,
        userID: 1,
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
        userID: 1,
        date: "2019/11/06",
        roomNumber: 5,
        roomServiceCharges: [ ]
      },
      {
        id: 1572293130160,
        userID: 1,
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
        userID: 1,
        date: "2019/12/01",
        roomNumber: 3,
        roomServiceCharges: [ ]
      },
      {
        id: 1572293130160,
        userID: 1,
        date: "2019/11/22",
        roomNumber: 4,
        roomServiceCharges: [ ]
      }]);
  });

  it('should have their customer ID as a property', () => {
    expect(customer.id).to.equal(1);
  });

  it('should have a name property', () => {
    expect(customer.name).to.equal('ben');
  })

})