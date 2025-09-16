import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Custom delivery boy icon
const deliveryIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
  iconSize: [40, 40],
});

// Center map dynamically
const RecenterMap = ({ position }) => {
  const map = useMap();
  map.setView(position);
  return null;
};

const OnlineTrackingPage = () => {
  const [deliveryLocation, setDeliveryLocation] = useState({ lat: 18.5204, lng: 73.8567 }); // Cafe
  const [userLocation] = useState({ lat: 18.531, lng: 73.844 }); // User
  const [eta, setEta] = useState(15); // Estimated minutes
  const [status, setStatus] = useState("Order Prepared");
  const deliveryRef = useRef(deliveryLocation);

  // Smooth movement simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setDeliveryLocation((prev) => {
        const deltaLat = (userLocation.lat - prev.lat) * 0.02;
        const deltaLng = (userLocation.lng - prev.lng) * 0.02;
        const nextPos = { lat: prev.lat + deltaLat, lng: prev.lng + deltaLng };
        deliveryRef.current = nextPos;

        // Update ETA and status
        const distance = Math.sqrt(
          Math.pow(userLocation.lat - nextPos.lat, 2) + Math.pow(userLocation.lng - nextPos.lng, 2)
        );
        setEta(Math.max(Math.ceil(distance * 1000 * 0.7), 1)); // rough estimate in minutes

        if (distance < 0.0005) setStatus("Arriving Soon");
        else if (distance < 0.002) setStatus("Out for Delivery");
        else setStatus("On the way");

        return nextPos;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [userLocation]);

  return (
    <div className="min-h-screen flex flex-col bg-[#fffaf5] font-sans">
      <Header />

      <main className="flex-1 px-6 py-10">
        <h1 className="text-3xl md:text-4xl font-bold text-[#4a2600] text-center mb-6">
          🚴 Live Order Tracking
        </h1>
        <p className="text-center text-gray-700 mb-6">
          Watch your coffee order reach you in real-time!
        </p>

        {/* ETA / Status Card */}
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6 mb-8 text-center">
          <h2 className="text-2xl font-bold text-[#8a4b27] mb-2">{status}</h2>
          <p className="text-gray-600 text-lg">
            Estimated Arrival: <span className="font-extrabold text-[#4a2600]">{eta} min</span>
          </p>
        </div>

        {/* Map */}
        <div className="w-full h-[70vh] rounded-xl shadow-lg overflow-hidden">
          <MapContainer
            center={deliveryLocation}
            zoom={15}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
            />

            {/* Polyline: Route */}
            <Polyline
              positions={[
                [deliveryLocation.lat, deliveryLocation.lng],
                [userLocation.lat, userLocation.lng],
              ]}
              color="#F59E0B" // amber
              weight={5}
            />

            {/* Delivery Boy Marker */}
            <Marker position={deliveryLocation} icon={deliveryIcon}>
              <Popup>Delivery Boy 📍</Popup>
            </Marker>

            {/* User Marker */}
            <Marker position={userLocation}>
              <Popup>Your Location 🏠</Popup>
            </Marker>

            {/* Recenter map on delivery boy */}
            <RecenterMap position={deliveryLocation} />
          </MapContainer>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OnlineTrackingPage;
