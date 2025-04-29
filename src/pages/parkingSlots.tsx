import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  getParkingSlots,
  reserveSlot,
  freeSlot,
} from "../api/parkingSlotsApi";
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
interface ParkingSlot {
  id: number;
  location: string;
  available: boolean;
}

const ParkingSlots: React.FC = () => {
  const [slots, setSlots] = useState<ParkingSlot[]>([]);
  const navigate = useNavigate();  //  Moved inside the component

  useEffect(() => {
    loadSlots();
  }, []);

  const loadSlots = async () => {
    const data = await getParkingSlots();
    const mappedData = data.map((slot: any) => ({
      id: slot.id,
      location: slot.slotNumber,    // Rename slotNumber -> location
      available: !slot.occupied,    // Invert occupied -> available
    }));
    setSlots(mappedData);
  };
  

  const handleBooking = async (slotId: number, userId: number) => {
    try {
      const reservation = await reserveSlot(slotId, userId);
      navigate(`/payment/${reservation.id}`);
    } catch (error) {
      console.error("Booking failed:", error);
    }
  };

  const handleReserve = async (id: number) => {
    try {
      const reservation = await reserveSlot(id, 1); // Assuming userId = 1 for now
      navigate(`/payment/${reservation.id}`);
      loadSlots();
    } catch (error) {
      console.error("Reservation failed:", error);
    }
  };

  const handleFree = async (id: number) => {
    await freeSlot(id);
    loadSlots(); // Refresh list after freeing
  };

  return (


    <div className="p-6">
        <Navbar/>
        <br/>
        <br/>
      <h1 className="text-2xl font-bold mb-4">Parking Spots</h1>
      <ul className="space-y-4">
        {slots.map((spot) => (
          <li key={spot.id} className="flex items-center justify-between border p-4 rounded-lg">
            <span>{spot.location}</span>
            <span>{spot.available ? "Available" : "Reserved"}</span>
            {spot.available ? (
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={() => handleReserve(spot.id)}
              >
                Reserve
              </button>
            ) : (
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => handleFree(spot.id)}
              >
                Free
              </button>
            )}
          </li>
        ))}
      </ul>
      <Footer/>
    </div>
  );
};

export default ParkingSlots;
