const assert = require("assert");
const { Given, When, Then } = require("cucumber");
const { User, Vehicle, Location } = require("./objects/Objects");

let vehicle;
let location;

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
