const { Given, When, Then } = require("cucumber");
const { User, Vehicle, FleetManager } = require("./objects/Objects");

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
