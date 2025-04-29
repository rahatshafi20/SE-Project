import { cn } from '@/lib/utils';
import { Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { createReservation } from '../api/parkingSlotsApi';
import { useState } from 'react';

export type ParkingSlotStatus = 'available' | 'occupied' | 'reserved' | 'charging';

interface ParkingSlotProps {
  id: string;
  status: ParkingSlotStatus;
  spotNumber: string;
  floor: string;
  price?: number;
  isAccessible?: boolean;
  isCharging?: boolean;
  occupiedUntil?: string;
  className?: string;
}

const statusConfig = {
  available: {
    color: 'bg-green-50 border-green-200',
    textColor: 'text-green-700',
    icon: 'text-green-500',
    label: 'Available'
  },
  occupied: {
    color: 'bg-red-50 border-red-200',
    textColor: 'text-red-700',
    icon: 'text-red-500',
    label: 'Occupied'
  },
  reserved: {
    color: 'bg-amber-50 border-amber-200',
    textColor: 'text-amber-700',
    icon: 'text-amber-500',
    label: 'Reserved'
  },
  charging: {
    color: 'bg-blue-50 border-blue-200',
    textColor: 'text-blue-700',
    icon: 'text-blue-500',
    label: 'Charging'
  }
};

const ParkingSlot = ({
  id,
  status,
  spotNumber,
  floor,
  price,
  isAccessible = false,
  isCharging = false,
  occupiedUntil,
  className
}: ParkingSlotProps) => {
  const navigate = useNavigate();
  const config = statusConfig[status];
  const [reserving, setReserving] = useState(false);

  const handleBooking = () => {
    if (status === 'available') {
      navigate(`/booking?spotId=${id}`);
    }
  };

  const handleReserve = async () => {
    setReserving(true);
    try {
      await createReservation(Number(id), 1);  // Hardcoded userId = 1
      alert('Reservation successful!');
      window.location.reload();  // Refresh to show updated status
    } catch (error) {
      alert('Failed to reserve slot.');
    } finally {
      setReserving(false);
    }
  };

  return (
    <div
      className={cn(
        'rounded-lg border p-4 transition-all duration-200',
        config.color,
        status === 'available' && 'hover:shadow-md cursor-pointer',
        className
      )}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-2">
          <div className={cn('w-8 h-8 rounded-full flex items-center justify-center', config.color)}>
            <Car className={cn('h-4 w-4', config.icon)} />
          </div>
          <div>
            <h3 className="font-medium text-sm">Spot {spotNumber}</h3>
            <p className="text-xs text-muted-foreground">Floor {floor}</p>
          </div>
        </div>
        <span className={cn('text-xs font-medium rounded-full px-2 py-1', config.color, config.textColor)}>
          {config.label}
        </span>
      </div>

      <div className="space-y-2">
        {price && status === 'available' && (
          <p className="text-sm font-medium">${price.toFixed(2)}/hour</p>
        )}

        {occupiedUntil && status !== 'available' && (
          <p className="text-xs text-muted-foreground">
            {status === 'occupied' ? 'Occupied until' : 'Reserved until'}: {occupiedUntil}
          </p>
        )}

        <div className="flex flex-wrap gap-2 mt-2">
          {isAccessible && (
            <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
              Accessible
            </span>
          )}

          {isCharging && (
            <span className="inline-flex items-center rounded-full bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700">
              EV Charging
            </span>
          )}
        </div>

        {status === 'available' && (
          <Button size="sm" className="w-full mt-3" onClick={handleBooking}>
            Book Now
          </Button>
        )}

        {status === 'available' && (
          <Button
            size="sm"
            variant="outline"
            className="w-full mt-2"
            onClick={handleReserve}
            disabled={reserving}
          >
            {reserving ? 'Reserving...' : 'Reserve Now'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ParkingSlot;
