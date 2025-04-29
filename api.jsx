const BASE_URL = 'http://localhost:8080/api';

// Fetch all parking spots
export async function getParkingSlots() {
  const response = await fetch(`${BASE_URL}/parking-slots`);
  return response.json();
}

// Reserve a parking spot
export async function reserveSlot(slotId) {
  const response = await fetch(`${BASE_URL}/parking-slots/${slotId}/reserve`, {
    method: 'POST',
  });
  return response.json();
}

// Free a parking spot
export async function freeSlot(slotId) {
  const response = await fetch(`${BASE_URL}/parking-slots/${slotId}/free`, {
    method: 'POST',
  });
  return response.json();
}

// Fetch all reservations
export async function getReservations() {
  const response = await fetch(`${BASE_URL}/reservations`);
  return response.json();
}

// Make a payment
export async function makePayment(reservationId, amount, method) {
  const response = await fetch(
    `${BASE_URL}/payments?reservationId=${reservationId}&amount=${amount}&paymentMethod=${method}`,
    { method: 'POST' }
  );
  return response.json();
}

// Fetch all payments
export async function getPayments() {
  const response = await fetch(`${BASE_URL}/payments`);
  return response.json();
}
