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

export function getExtensionTransactionDescription(lockerId: number): string {
  return `BKWE${lockerId}`;
}

export function encodeExtensionUrl(deviceId: string, lockerId: number): string {
  const payload = `${deviceId},${lockerId}`;
  return btoa(payload);
}

export function decodeExtensionUrl(encoded: string): { deviceId: string; lockerId: string } | null {
  try {
    const decoded = atob(encoded);
    const [deviceId, lockerId] = decoded.split(',');

    if (!deviceId || !lockerId) {
      return null;
    }

    return { deviceId, lockerId };
  } catch (error) {
    console.error('Failed to decode extension URL:', error);
    return null;
  }
}

export function generateExtensionLink(deviceId: string, lockerId: number): string {
  const encoded = encodeExtensionUrl(deviceId, lockerId);
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  return `${baseUrl}/booking?ext=${encoded}`;
}

export async function getBookingDetails(
  deviceId: string,
  phoneNumber: string
): Promise<Booking> {
  const encodedPhone = encodeURIComponent(phoneNumber);
  return apiClient.get<Booking>(
    `/devices/${deviceId}/bookings/lookup?phone_number=${encodedPhone}`
  );
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

export async function initiateExtensionPayment(
  deviceId: string,
  lockerId: number,
  phoneNumber: string,
  amount: number
): Promise<InitiatePaymentResponse> {
  const referenceId = `EXT_${generateReferenceId()}`;
  const transactionDesc = getExtensionTransactionDescription(lockerId);

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
