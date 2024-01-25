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
    this.fleet = new Fleet();
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

module.exports = { Vehicle, Location, User, FleetManager };
