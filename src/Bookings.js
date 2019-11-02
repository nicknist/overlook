class Bookings {
  constructor(roomData, bookingData) {
    this.roomData = roomData;
    this.bookingData = bookingData;
  }

  roomsAvailable(date) {
    return this.roomData.filter(room => {
      return !this.bookingData.find(booking => {
        return (room.number === booking.roomNumber && date === booking.date);
      });
    });
  }

  totalRevenue(date) {
    console.log(this.bookingData.filter(booking => booking.date === date));
    return this.bookingData.filter(booking => booking.date === date).reduce((acc, sum) => {
      let priceForRoom = Math.floor(this.roomData.find(room => room.number === sum.roomNumber).costPerNight);
      return acc += priceForRoom;
    }
    , 0);
  }

  percentOfRoomsOccupied(date) {
    return Math.floor((this.roomData.length - (this.roomsAvailable(date).length)) / (this.roomData.length) * 100);
  }

  findPastCustomerBookings(userID, date) {
    let thing =  this.bookingData.filter(booking => booking.userID === userID && date <= booking.date);
    console.log(thing);
  }

  findUpcomingCustomerBookings(userID, date) {
    let thing =  this.bookingData.filter(booking => booking.userID === userID && date > booking.date);
    console.log(thing);
  }

  totalAmountCustomerSpent(userID) {
    return this.findCustomerBookings(userID).reduce((acc, sum) => {
      let priceForRoom = Math.floor(this.roomData.find(room => room.number === sum.roomNumber).costPerNight);
      return acc += priceForRoom;
    }, 0);
  }
}

export default Bookings;
