class ParkingArea {
  constructor(name, location, sizeOfParkingArea, cash = 0) {
    this.name = name;
    this.location = location;
    this.sizeOfParkingArea = parseFloat(sizeOfParkingArea);
    this.cash = parseFloat(cash);
  }

  greeting() {
    return `Welcome to ${this.name} Parking Area, ${this.location}!`;
  }
}

class Vehicle {
  constructor(
    name,
    type,
    size,
    ticketNumber,
    ticketPrice
  ) {
    this.name = name;
    this.type = type;
    this.size = parseFloat(size);
    this.ticketNumber = ticketNumber;
    this.ticketPrice = parseFloat(ticketPrice);
    this.parkStatus = false;
    this.parkingTime = parseFloat(0);
  }

  // Vehicle wants to enter parking area
  parkIn(parkingArea, ticketMachine) {
    this.parkStatus = true;
    console.log(
      `${ticketMachine.name}: Welcome to ${parkingArea.name}. Please keep your ticket. Thank you.`
    );

    // Ticket Machine run printTicket()
    return ticketMachine.printTicket(parkingArea, this);
  }

  // Set how long vehicle is parked (in hours)
  setParkingTime(time) {
    this.parkingTime += time;

    return `${this.name} has parked for ${time} hours.`;
  }

  // Vehicle wants to leave parking area
  parkOut(parkingArea, ticketMachine) {
    this.parkStatus = false;
    console.log(`${this.name} parked out from ${parkingArea.name}.`);

    // Ticket Machine serve payment
    return ticketMachine.pay(parkingArea, this);
  }
}

class Car extends Vehicle {
  constructor(
    name,
    ticketNumber,
    ticketPrice,
    parkStatus,
    parkingTime
  ) {
    super(name, "car", "15", ticketNumber, ticketPrice, parkStatus, parkingTime);
  }
}

class Motor extends Vehicle {
  constructor(
    name,
    ticketNumber,
    ticketPrice,
    parkStatus,
    parkingTime
  ) {
    super(name, "motor", "2.5", ticketNumber, ticketPrice, parkStatus, parkingTime);
  }
}

class TicketingMachine {
  constructor(name, ticketAvailable = 200) {
    this.name = name;
    this.number = parseFloat(1);
    this.price = parseFloat(10000);
    this.ticketAvailable = parseFloat(ticketAvailable);
  }

  // Get ticket price
  getTicketPrice(vehicle) {
    if (vehicle.type === "car") {
      return vehicle.ticketPrice = 5000;
    }

    if (vehicle.type === "motor") {
      return vehicle.ticketPrice = 2000;
    }
  }

  // Print ticket for incoming vehicle
  printTicket(parkingArea, vehicle) {
    if (this.ticketAvailable > 0) {
      if (parkingArea.sizeOfParkingArea - vehicle.size >= 0) {
        parkingArea.sizeOfParkingArea -= vehicle.size;
        this.ticketAvailable--;
        vehicle.ticketNumber = `${this.name}-${this.number}`;
        this.number++;
        this.getTicketPrice(vehicle);

        return `${vehicle.name} enter ${parkingArea.name}. Ticket number is ${vehicle.ticketNumber} and ticket price is Rp${vehicle.ticketPrice}/hour.`;
      }

      return `Sorry, no more available space for ${parkingArea.name} Parking Area. Please find another parking area.`;
    }

    return `Sorry, we are closed. No more ticket for today.`;
  }

  // Reset ticketPrice, ticketNumber, parkingTime of vehicle after pay
  resetVehicleStatus(vehicle) {
    vehicle.ticketPrice = 0;
    vehicle.ticketNumber = null;
    vehicle.parkingTime = 0;
  }

  // Serve payment for every vehicle that wants to leave parking area
  pay(parkingArea, vehicle) {
    let bill = vehicle.ticketPrice * vehicle.parkingTime;
    parkingArea.cash += bill;
    parkingArea.sizeOfParkingArea += parseFloat(vehicle.size);
    this.resetVehicleStatus(vehicle);

    return `Thank you. You pay : Rp${bill},00`;
  }
}

// Test
let Hartono = new ParkingArea("Hartono Mall", "Sleman", 2000);
let Tm1 = new TicketingMachine("Tm1");
let Tm2 = new TicketingMachine("Tm2");
let Tm3 = new TicketingMachine("Tm3");
let BMW = new Car("BMW");
let Vario = new Motor("Vario");

console.log(Hartono.greeting()); // Welcome to Hartono Mall Parking Area, Sleman!
console.log(BMW.parkIn(Hartono, Tm1)); // Tm1: Welcome to Hartono Mall. Please keep your ticket. Thank you.
// BMW enter Hartono Mall. Ticket number is Tm1-1 and ticket price is Rp5000/hour.
console.log(Vario.parkIn(Hartono, Tm2)); // Tm2: Welcome to Hartono Mall. Please keep your ticket. Thank you.
// Vario enter Hartono Mall. Ticket number is Tm2-1 and ticket price is Rp2000/hour.
console.log(BMW.setParkingTime(3)); // BMW has parked for 3 hours.
console.log(BMW.parkOut(Hartono, Tm2)); // BMW parked out from Hartono Mall.
// Thank you. You pay : Rp15000,00
console.log(Vario.setParkingTime(2)); // Vario has parked for 2 hours.
console.log(Vario.parkOut(Hartono, Tm1)); // Vario parked out from Hartono Mall.
// Thank you. You pay : Rp4000,00
console.log(BMW.parkIn(Hartono, Tm2)); // Tm2: Welcome to Hartono Mall. Please keep your ticket. Thank you.
// BMW enter Hartono Mall. Ticket number is Tm2-2 and ticket price is Rp5000/hour.
console.log(Vario.parkIn(Hartono, Tm2)); // Tm2: Welcome to Hartono Mall. Please keep your ticket. Thank you.
// Vario enter Hartono Mall. Ticket number is Tm2-3 and ticket price is Rp2000/hour.

console.log(BMW);
console.log(Vario);
console.log(Hartono);
