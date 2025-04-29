// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8081;

app.use(cors());
app.use(express.json());

// Dummy parking slots
let parkingSlots = [
  { id: 1, slotNumber: 'A1', occupied: false },
  { id: 2, slotNumber: 'A2', occupied: false },
];

// Dummy reservations
let reservations = [];

app.get('/api/parking-slots', (req, res) => {
  res.json(parkingSlots);
});

app.post('/api/reservations', (req, res) => {
  const { userId, parkingSlotId, startTime, endTime } = req.body;
  const reservation = { id: reservations.length + 1, userId, parkingSlotId, startTime, endTime };
  reservations.push(reservation);

  // Mark slot as occupied
  const slot = parkingSlots.find((s) => s.id === parkingSlotId);
  if (slot) slot.occupied = true;

  res.json(reservation);
});

app.post('/api/parking-slots/:slotId/free', (req, res) => {
  const slotId = parseInt(req.params.slotId);
  const slot = parkingSlots.find((s) => s.id === slotId);
  if (slot) {
    slot.occupied = false;
    res.json({ message: 'Slot freed' });
  } else {
    res.status(404).json({ message: 'Slot not found' });
  }
});

app.get('/api/reservations', (req, res) => {
  res.json(reservations);
});

app.post('/api/payments', (req, res) => {
  const { reservationId, amount, paymentMethod } = req.body;
  res.json({ message: 'Payment successful', reservationId, amount, paymentMethod });
});

app.listen(PORT, () => {
  console.log(`Backend Server running at http://localhost:${PORT}`);
});
