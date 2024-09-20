import React from "react";

const DeviceCard = ({
  device,
  selected,
  url,
  urls,
  handleDeviceSelect,
  handleUrlSelect,
}) => {
  return (
    <div className="p-4 bg-white shadow rounded">
      <label className="block">
        <input
          type="checkbox"
          className="mr-2"
          checked={selected || false}
          onChange={() => handleDeviceSelect(device.id)}
        />
        <span className="font-medium">{device.friendly_name}</span>
      </label>
      <p>IP Address: {device.ip_address}</p>
      <p>Model: {device.md}</p>
      <p>Port: {device.port}</p>
      {selected && (
        <div className="mt-2">
          <label className="block font-medium">Select URL:</label>
          <select
            className="p-2 border rounded"
            value={url || ""}
            onChange={(e) => handleUrlSelect(device.id, e.target.value)}
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
  );
};

export default DeviceCard;
