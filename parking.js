class ParkingArea {
  constructor(
    name,
    location,
    sizeOfParkingArea,
    cash = 0
  ) {
    this.name = name;
    this.location = location;
    this.sizeOfParkingArea = sizeOfParkingArea;
    this.cash = cash;
  }

  greeting() {
    return `Welcome to ${this.name} Parking Area, ${this.location}!`;
  }
}

class Vehicle {
  constructor(name, type, size, ticketNumber, ticketPrice) {
    this.name = name;
    this.type = type;
    this.size = size;
    this.ticketNumber = ticketNumber;
    this.ticketPrice = ticketPrice;
  }

  parkIn(parkingArea, ticketMachine){
    ticketMachine.printTicket(parkingArea, this.name);
  }
}

class Car extends Vehicle {
  constructor(name, type = "car", size = "15", ticketNumber, ticketPrice) {
    super(name, type, size, ticketNumber, ticketPrice);
  }
}

class Motor extends Vehicle {
  constructor(name, type = "motor", size = "2.5", ticketNumber, ticketPrice) {
    super(name, type, size, ticketNumber, ticketPrice);
  }
}

class TicketingMachine {
  constructor(number = 1, price, ticketAvailable = 200) {
    this.number = number;
    this.price = price;
    this.ticketAvailable = ticketAvailable;
  }

  printTicket(parkingArea, vehicle) {
    if (this.ticketAvailable > 0) {
      if (parkingArea.sizeOfParkingArea >= vehicle.size) {
        parkingArea.sizeOfParkingArea -= vehicle.size;
        this.ticketAvailable--;
        vehicle.ticketNumber = this.number;
        this.number++;
        if (vehicle.type === "car") {
          vehicle.ticketPrice = 5000;
          return `${vehicle.name} enter ${parkingArea.name}. Ticket number is ${vehicle.ticketNumber} and ticket price is ${vehicle.ticketPrice}`;
        } else if (vehicle.type === "motor") {
          vehicle.ticketPrice = 2000;
          return `${vehicle.name} enter ${parkingArea.name}. Ticket number is ${vehicle.ticketNumber} and ticket price is ${vehicle.ticketPrice}`;
        } else {
          vehicle.ticketPrice = 10000;
          return `${vehicle.name} enter ${parkingArea.name}. Ticket number is ${vehicle.ticketNumber} and ticket price is ${vehicle.ticketPrice}`;
        }
      } else {
        return `Sorry, no more available space for ${ParkingArea.name} Parking Area. Please find another parking area.`;
      }
    } else {
      return `Sorry, we are closed. No more ticket for today.`;
    }
  }
}