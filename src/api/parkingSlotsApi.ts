const BASE_URL = "http://localhost:8081/api";

// Fetch all parking spots
export const getParkingSlots = async () => {
  const response = await fetch(`${BASE_URL}/parking-slots`);
  return response.json();
};

// Updated reserveSlot function to accept slotId and userId
export const reserveSlot = async (slotId: number, userId: number) => {
  const response = await fetch(`${BASE_URL}/reservations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      parkingSlotId: slotId,
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour later
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to reserve slot");
  }
  return response.json();
};


// Free a parking spot
export const freeSlot = async (slotId: number) => {
  const response = await fetch(`${BASE_URL}/parking-slots/${slotId}/free`, {
    method: "POST",
  });
  return response.json();
};

// Fetch all reservations
export const getReservations = async () => {
    const response = await fetch("http://localhost:8081/api/reservations");
    if (!response.ok) {
      throw new Error("Failed to fetch reservations");
    }
    return response.json();
  };
  
  // Reserve a parking slot
  export const createReservation = async (slotId: number, userId: number) => {
    const response = await fetch("http://localhost:8081/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        parkingSpotId: slotId,
        startTime: new Date().toISOString(),
        endTime: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour later
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to reserve slot");
    }
    return response.json();
  };
  
// Process payment
export const processPayment = async (reservationId: number, amount: number, paymentMethod: string) => {
  const response = await fetch(`${BASE_URL}/payments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reservationId, amount, paymentMethod })
  });
  if (!response.ok) {
    throw new Error("Payment failed");
  }
  return response.json();
};
