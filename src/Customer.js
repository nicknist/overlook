class Customer {
  constructor(customerBookings, userID, name) {
    this.customerBookings = customerBookings;
    this.id = userID;
    this.name = name.toLowerCase();
    this.chosenDate = null;
  }

//$('input[name="room"]:checked').parentElement.textContent

  bookRoom(date, roomNumber) {
    fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "userID": this.id,
        "date": date,
        "roomNumber": roomNumber
      })
    }).then(() => {
      console.log('YOU DID IT!');
      return true;
    }).catch(() => {
      console.log('FAILURE');
      return false;
    });
  }

  filterRoomsByType(roomsAvailable) {
    return roomsAvailable.sort((a, b) => {
      if (b.roomType > a.roomType) {
        return -1;
      }
      if (a.roomType > b.roomType) {
        return 1;
      }
      return 0;
    });
  }
}

export default Customer;
