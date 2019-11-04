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
    return this.bookingData.filter(booking => booking.userID === userID && date > booking.date);
  }

  findUpcomingCustomerBookings(userID, date) {
    return this.bookingData.filter(booking => booking.userID === userID && date <= booking.date);
  }

  findCustomerBookings(userID) {
    return this.bookingData.filter(booking => booking.userID === userID);
  }

  totalAmountCustomerSpent(userID) {
    return this.findCustomerBookings(userID).reduce((acc, sum) => {
      let priceForRoom = Math.floor(this.roomData.find(room => room.number === sum.roomNumber).costPerNight);
      return acc += priceForRoom;
    }, 0);
  }

  returnBookingNumber(userID, date, roomNumber) {
    return this.bookingData.find(booking => booking.date === date && booking.userID === userID && booking.roomNumber === roomNumber);
  }
}

export default Bookings;
