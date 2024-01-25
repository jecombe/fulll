const assert = require("assert");
const { Given, When, Then } = require("cucumber");

class Location {
  constructor(name, latitude, longitude) {
    this.name = name;
    this.vehicles = [];
    this.latitude = latitude;
    this.longitude = longitude;
  }

  isParked(vehicle) {
    return this.vehicles.includes(vehicle);
  }

  addVehicle(vehicle) {
    if (this.isParked(vehicle)) return false;
    this.vehicles.push(vehicle);
    return true;
  }

  isVehiclePresent(vehicle) {
    return this.vehicles.includes(vehicle);
  }
}

class User {
  constructor(name) {
    this.name = name;
    this.fleet = new FleetManager();
    this.vehicleLocation = new Map();
  }

  parkVehicleAtLocation(vehicle, location) {
    const isSuccess = location.addVehicle(vehicle);
    if (isSuccess) {
      this.vehicleLocation.set(vehicle, location);
      return "your vehicle is save";
    }
    return "your vehicle is not save";
  }

  getVehicleLocation(vehicle) {
    return this.vehicleLocation.get(vehicle);
  }
}

class FleetManager {
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

class Vehicle {
  constructor(mode, immatriculation, user) {
    this.mode = mode;
    this.user = user;
    this.location = null;
    this.immatriculation = immatriculation;
  }
  addLocation(location) {
    this.location = location;
  }

  getLocation() {
    return location;
  }
}

// Importez ici vos classes ou modules nécessaires

let vehicle;
let location;
let errorMessage;

let user = new User();
let saveVehicle = new Vehicle("moto", "DSDSDFF", user);
user.fleet.registerVehicle(saveVehicle);

Given("a location", function () {
  location = new Location("Parking Lot A", 1, 2);
});

When("I park my vehicle at this location", function () {
  try {
    errorMessage = user.parkVehicleAtLocation(vehicle, location);
  } catch (error) {
    errorMessage = error.message;
  }
});

Then(
  "the known location of my vehicle should verify this location",
  function () {
    const locVehicle = user.getVehicleLocation(vehicle);
    const isSame =
      locVehicle &&
      locVehicle.latitude === location.latitude &&
      locVehicle.longitude === location.longitude;
    assert.ok(isSame, "Expected error message");
  }
);

Given("my vehicle has been parked into this location", function () {
  location.addVehicle(vehicle);
  assert.ok(location.isParked(vehicle), "Vehicle is parked at this location.");
});

When("I try to park my vehicle at this location", function () {
  errorMessage = null;
  try {
    user.parkVehicleAtLocation(vehicle, location);
  } catch (error) {
    errorMessage = error.message;
  }
});

Then(
  "I should be informed that my vehicle is already parked at this location",
  function () {
    const isPres = location.isVehiclePresent(vehicle);
    if (isPres) console.log("Vehicle is parked at this location.");
  }
);
