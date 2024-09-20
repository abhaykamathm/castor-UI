import React from "react";
import DeviceCard from "./DeviceCard";

const DeviceList = ({
  devices,
  selectedDevices,
  urlMapping,
  urls,
  handleDeviceSelect,
  handleUrlSelect,
}) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {devices.length === 0 ? (
        <div>No devices found on this network</div>
      ) : (
        devices.map((device) => (
          <DeviceCard
            key={device.id}
            device={device}
            selected={selectedDevices[device.id]}
            url={urlMapping[device.id]}
            urls={urls}
            handleDeviceSelect={handleDeviceSelect}
            handleUrlSelect={handleUrlSelect}
          />
        ))
      )}
    </div>
  );
};

export default DeviceList;
