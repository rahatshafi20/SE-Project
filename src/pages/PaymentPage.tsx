import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { processPayment } from '@/api/parkingSlotsApi';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

const PaymentPage = () => {
  const { reservationId: paramId } = useParams();
  const [reservationId, setReservationId] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [loading, setLoading] = useState(false);

  // Auto-fill reservationId if it's in the URL
  useEffect(() => {
    if (paramId) setReservationId(paramId);
  }, [paramId]);

  const handlePayment = async () => {
    if (!reservationId || !amount) {
      toast({ title: 'Error', description: 'Please fill in all fields', variant: 'destructive' });
      return;
    }

    try {
      setLoading(true);
      await processPayment(Number(reservationId), Number(amount), paymentMethod);
      toast({ title: 'Success', description: 'Payment processed successfully', variant: 'default' });
    } catch (error) {
      toast({ title: 'Error', description: 'Payment failed', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <Card className="w-full max-w-md shadow-lg rounded-lg overflow-hidden">
        <CardContent className="p-6 space-y-6">
          <h1 className="text-2xl font-bold text-center text-primary">Payment</h1>
          <div className="space-y-4">
            <Input
              type="number"
              placeholder="Reservation ID"
              value={reservationId}
              disabled
            />
            <Input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary"
            >
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="Cash">Cash</option>
            </select>
            <Button
              onClick={handlePayment}
              disabled={loading}
              className="w-full bg-primary text-white py-2 mt-4 hover:bg-primary-dark transition-all duration-300"
            >
              {loading ? 'Processing...' : 'Pay Now'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentPage;
