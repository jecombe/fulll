const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

class Fleet {
  constructor() {
    this.loadData();
  }

  loadData() {
    try {
      const data = fs.readFileSync("fleetData.json", "utf8");
      this.fleetData = JSON.parse(data);
    } catch (error) {
      this.fleetData = {};
    }
  }

  create(userId) {
    const fleetId = uuidv4();
    this.fleetData[fleetId] = { userId, vehicles: {} };
    this.saveData();
    return fleetId;
  }

  registerVehicle(fleetId, vehiclePlateNumber) {
    this.loadData();

    if (!this.fleetData[fleetId]) {
      console.error("Error: Fleet not found.");
      return;
    }

    // Check if the vehicle with the given plate number already exists
    const existingVehicle = Object.values(
      this.fleetData[fleetId].vehicles
    ).find((vehicle) => vehicle.plateNumber === vehiclePlateNumber);

    if (existingVehicle) {
      console.error("Error: Vehicle already registered.");
      return;
    }

    this.fleetData[fleetId].vehicles[vehiclePlateNumber] = {
      plateNumber: vehiclePlateNumber,
      location: null,
    };
    this.saveData();
    console.log(`Vehicle registered with ID: ${vehiclePlateNumber}`);
  }

  localizeVehicle(fleetId, vehicleId, lat, lng, alt) {
    if (
      !this.fleetData[fleetId] ||
      !this.fleetData[fleetId].vehicles[vehicleId]
    ) {
      console.error("Error: Fleet or vehicle not found.");
      return;
    }

    this.fleetData[fleetId].vehicles[vehicleId].location = { lat, lng, alt };
    this.saveData();
    console.log(`Vehicle location updated for ID: ${vehicleId}`);
  }

  saveData() {
    const jsonData = JSON.stringify(this.fleetData, null, 2);
    fs.writeFileSync("fleetData.json", jsonData, "utf8");
  }
}

const fleet = new Fleet();

const [, , command, ...args] = process.argv;

const create = () => {
  const userId = args[0];
  const fleetId = fleet.create(userId);
  console.log(`Fleet created with ID: ${fleetId}`);
};

const register = () => {
  const regFleetId = args[0];
  const vehiclePlateNumber = args[1];
  fleet.registerVehicle(regFleetId, vehiclePlateNumber);
};

const localize = () => {
  const locFleetId = args[0];
  const vehicleId = args[1];
  const lat = args[2];
  const lng = args[3];
  const alt = args[4];
  fleet.localizeVehicle(locFleetId, vehicleId, lat, lng, alt);
};

const startExecution = (command) => {
  if (command === "create") {
    create();
  } else if (command === "register-vehicle") {
    register();
  } else if (command === "localize-vehicle") {
    localize();
  } else {
    console.log(
      "Invalid command. Supported commands: create, register-vehicle, localize-vehicle"
    );
  }
};

startExecution(command);
