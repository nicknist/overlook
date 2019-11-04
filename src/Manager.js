import Customer from './Customer';

class Manager extends Customer {
  constructor(customerBookings, userID, name, customerData) {
    super(customerBookings, userID, name);
    this.customerData = customerData;
  }

  updateCustomerID(name) {
    let newCustomer = this.customerData.find(customer => customer.name.toLowerCase().includes(name));
    this.id = newCustomer.id;
    this.name = newCustomer.name;
  }

  updateCurrentCustomerBookings(newBookings) {
    this.customerBookings = newBookings;
  }

  deleteBooking(number) {
    fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: number
      })
    }).then(() => {
      console.log('YOU DID IT!');
      return true;
    }).catch(() => {
      console.log('FAILURE');
      return false;
    });
  }
}

export default Manager;
