const sensorLib = require("node-dht-sensor");
const db = require("./config/db");
var app = {
  sensors: [
 
    {
      name: "CPD-A",
      type: 22,
      pin: 25
    }
  ],
  read: async function() {
    for (var sensor in this.sensors) {
      var readout = sensorLib.read(
        this.sensors[sensor].type,
        this.sensors[sensor].pin
      );
      console.log(
        `[${this.sensors[sensor].name}] ` +
          `temperature: ${readout.temperature.toFixed(1)}°C, ` +
          `humidity: ${readout.humidity.toFixed(1)}% ` +
	  `time: ${new Date()}`
      );
	const data = { 
          temp: readout.temperature.toFixed(1),
          humidity: readout.humidity.toFixed(1),
	  time: new Date(),
	  name: this.sensors[sensor].name
      }
      if(data.temp > 0) {
      await insertDb(data)
      }	
    }
    setTimeout(function() {
      app.read();
    }, 15000);
  }
};

async function insertDb (data) {
    return await db('week_temp').insert({...data})
}

app.read()
