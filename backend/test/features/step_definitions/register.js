const { Given, When, Then } = require("cucumber");

class Vehicle {
  constructor(mode, immatriculation, usr) {
    this.mode = mode;
    this.immatriculation = immatriculation;
    this.usr = usr;
    this.isParked = false;
  }
}

class User {
  constructor(name) {
    this.name = name;
    this.fleet = new Fleet(this);
  }
}

class Fleet {
  constructor() {
    this.vehicleFleet = new Set();
  }

  registerVehicle(vehicle) {
    if (this.vehicleFleet.has(vehicle)) {
      return false;
    } else {
      this.vehicleFleet.add(vehicle);
      return true;
    }
  }

  hasVehicle(vehicle) {
    return this.vehicleFleet.has(vehicle);
  }
}

class FleetManager {
  constructor() {
    this.users = [];
  }

  setUser(user) {
    this.users.push(user);
  }

  isVehicleInFleetByOtherUser(vehicle, userActual) {
    for (const user of this.users) {
      if (user.fleet.hasVehicle(vehicle) && user.name !== userActual.name) {
        return true;
      }
    }
    return false;
  }
}

let usr;
let usr2;
const fleet = new FleetManager();

Given("my fleet", function () {
  usr = new User("name1");
  fleet.setUser(usr);
});

let registeredVehicle;

Given("a vehicle", function () {
  registeredVehicle = new Vehicle("moto", "eeeeeee");
});

When("I register this vehicle into my fleet", function () {
  if (!usr.fleet.registerVehicle(registeredVehicle)) {
    throw new Error("Vehicle is already registered.");
  }
});

Then("this vehicle should be part of my vehicle fleet", function () {
  if (!usr.fleet.hasVehicle(registeredVehicle)) {
    throw new Error("Vehicle is not part of the fleet.");
  }
});

Given("I have registered this vehicle into my fleet", function () {
  if (usr.fleet.hasVehicle(registeredVehicle)) {
    throw new Error("Vehicle is already registered.");
  }
});

When("I try to register this vehicle into my fleet", function () {
  if (!usr.fleet.registerVehicle(registeredVehicle)) {
    throw new Error("Vehicle is already registered.");
  }
});

Given("the fleet of another user", function () {
  usr2 = new User("name2");
});

Given(
  "this vehicle has been registered into the other user's fleet",
  function () {
    return fleet.isVehicleInFleetByOtherUser(registeredVehicle, usr2);
  }
);
Then(
  "I should be informed this vehicle has already been registered into my fleet",
  function () {
    if (!usr.fleet.registerVehicle(registeredVehicle)) {
      console.error("Vehicle is already registered.");
    }
  }
);
