import React, { useState, useEffect } from "react";

const App = () => {
  const [devices, setDevices] = useState([]);
  const [selectedDevices, setSelectedDevices] = useState({});
  const [urlMapping, setUrlMapping] = useState({});
  const [loading, setLoading] = useState(true); // Loading state
  const [urls] = useState([
    "https://izak.aidtaas.com/",
    "https://mo.aidtaas.com/",
    "https://museo.aidtaas.com/",
    "https://clinks.aidtaas.com/",
    "https://around.aidtaas.com/",
    "https://revee.aidtaas.com/",
    "https://aegis.aidtaas.com/",
    "https://spectraguard.aidtaas.com/",
  ]); // List of URLs to choose from

  // Fetch devices from the API
  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch("http://localhost:4000/get-devices");
        const data = await response.json();
        setDevices(data); // Save fetched data to state
        setLoading(false); // Stop loading once data is fetched
      } catch (error) {
        console.error("Error fetching devices:", error);
        setLoading(false); // Stop loading even if there's an error
      }
    };

    fetchDevices();
  }, []); // Empty dependency array ensures it runs only once on mount

  // Handle device selection
  const handleDeviceSelect = (deviceId) => {
    setSelectedDevices((prevSelectedDevices) => ({
      ...prevSelectedDevices,
      [deviceId]: !prevSelectedDevices[deviceId], // Toggle selection
    }));
  };

  // Handle URL selection for each device
  const handleUrlSelect = (deviceId, selectedUrl) => {
    setUrlMapping((prevUrlMapping) => ({
      ...prevUrlMapping,
      [deviceId]: selectedUrl,
    }));
  };

  // Handle casting the selected URLs to the devices
  const handleCast = async () => {
    const selectedDevicesForCast = Object.keys(selectedDevices).filter(
      (deviceId) => selectedDevices[deviceId]
    );

    const payload = selectedDevicesForCast.map((deviceId) => ({
      url: urlMapping[deviceId] || urls[0], // Default to the first URL if none is selected
      device_ip: devices.find((device) => device.id === deviceId).ip_address,
      device_name: devices.find((device) => device.id === deviceId)
        .friendly_name,
    }));

    try {
      const response = await fetch("http://localhost:4000/receive-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log("Casting successful!");
      } else {
        console.error("Error in casting request");
      }
    } catch (error) {
      console.error("Error sending cast request:", error);
    }
  };

  return (
    <div className="w-full h-full bg-yellow-100 p-4 overflow-auto">
      <h1 className="text-xl font-bold mb-4">Available Devices</h1>
      {loading ? (
        <div className="text-center">Loading devices...</div> // Simple loader
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {devices.length === 0 ? (
            <div>No devices found on this network</div>
          ) : (
            devices.map((device) => (
              <div key={device.id} className="p-4 bg-white shadow rounded">
                <label className="block">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={selectedDevices[device.id] || false}
                    onChange={() => handleDeviceSelect(device.id)}
                  />
                  <span className="font-medium">{device.friendly_name}</span>
                </label>
                <p>IP Address: {device.ip_address}</p>
                <p>Model: {device.md}</p>
                <p>Port: {device.port}</p>
                {selectedDevices[device.id] && (
                  <div className="mt-2">
                    <label className="block font-medium">Select URL:</label>
                    <select
                      className="p-2 border rounded"
                      value={urlMapping[device.id] || ""}
                      onChange={(e) =>
                        handleUrlSelect(device.id, e.target.value)
                      }
                    >
                      <option value="" disabled>
                        Select a URL
                      </option>
                      {urls.map((url) => (
                        <option key={url} value={url}>
                          {url}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleCast}
        disabled={Object.keys(selectedDevices).length === 0}
      >
        Cast Selected URLs
      </button>
    </div>
  );
};

export default App;
