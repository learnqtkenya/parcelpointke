import { apiClient } from './client';
import type {
  DeviceOverview,
  Booking,
  InitiatePaymentRequest,
  InitiatePaymentResponse,
} from './types';

export async function getDevicesOverview(): Promise<DeviceOverview[]> {
  return apiClient.get<DeviceOverview[]>('/devices/overview');
}

export async function checkExistingBooking(
  deviceId: string,
  phoneNumber: string
): Promise<Booking | null> {
  try {
    const encodedPhone = encodeURIComponent(phoneNumber);
    return await apiClient.get<Booking>(
      `/devices/${deviceId}/bookings/lookup?phone_number=${encodedPhone}`
    );
  } catch (error) {
    if (error instanceof Error && error.message.includes('Booking not found')) {
      return null;
    }
    throw error;
  }
}

export function generateReferenceId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 10; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function getTransactionDescription(lockerSize: 'small' | 'medium' | 'large'): string {
  const sizeMap = {
    small: 'BKWF0',
    medium: 'BKWF1',
    large: 'BKWF2',
  };
  return sizeMap[lockerSize];
}

export async function initiateBookingPayment(
  deviceId: string,
  phoneNumber: string,
  amount: number,
  lockerSize: 'small' | 'medium' | 'large',
  hours: number
): Promise<InitiatePaymentResponse> {
  const referenceId = generateReferenceId();
  const transactionDesc = getTransactionDescription(lockerSize);

  const payload: InitiatePaymentRequest = {
    reference_id: referenceId,
    transaction_type: 1,
    amount: amount.toString(),
    phone_number: phoneNumber,
    account_reference: 'ParcelPoint',
    transaction_desc: transactionDesc,
  };

  return apiClient.post<InitiatePaymentResponse>(
    `/devices/${deviceId}/payments`,
    payload
  );
}
