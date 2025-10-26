export interface Location {
  latitude: number;
  longitude: number;
}

export interface LockerSizeMetric {
  available: number;
  total: number;
}

export interface LockerMetrics {
  small: LockerSizeMetric;
  medium: LockerSizeMetric;
  large: LockerSizeMetric;
  total_available: number;
  total_occupied: number;
  total: number;
}

export interface DeviceOverview {
  id: string;
  name: string;
  location?: Location;
  capacity: number;
  status: number;
  last_seen?: string;
  locker_metrics: LockerMetrics;
}

export interface Booking {
  id: number;
  booking_id: string;
  device_id: string;
  locker_id: number;
  unlocking_code: string;
  owner_phone_no: string;
  receipt_time: string;
  expires_at: string;
  status: number;
  last_used?: string;
  created_at: string;
  updated_at: string;
}

export interface InitiatePaymentRequest {
  reference_id: string;
  transaction_type: number;
  amount: string;
  phone_number: string;
  account_reference: string;
  transaction_desc: string;
}

export interface InitiatePaymentResponse {
  message: string;
}

export const DeviceStatus = {
  ACTIVE: 0,
  INACTIVE: 1,
} as const;

export const LockerSize = {
  SMALL: 0,
  MEDIUM: 1,
  LARGE: 2,
} as const;

export const LockerStatus = {
  AVAILABLE: 0,
  OCCUPIED: 1,
} as const;

export const BookingStatus = {
  ACTIVE: 0,
  USED: 1,
  EXPIRED: 2,
} as const;

export const TransactionType = {
  PARCEL: 0,
  BOOKING: 1,
} as const;
