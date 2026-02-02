import { DonationOption, Donor } from './types';

export const DONATION_OPTIONS: DonationOption[] = [
  { value: 50000, label: 'Rp 50.000' },
  { value: 100000, label: 'Rp 100.000' },
  { value: 500000, label: 'Rp 500.000' },
  { value: 1000000, label: 'Rp 1.000.000' },
];

export const MOCK_DONORS: Donor[] = [
  { id: '1', name: 'Hamba Allah', amount: 500000, timestamp: new Date() },
  { id: '2', name: 'Budi Santoso', amount: 100000, timestamp: new Date() },
  { id: '3', name: 'Siti Aminah', amount: 50000, timestamp: new Date() },
  { id: '4', name: 'Rizky P.', amount: 1000000, timestamp: new Date() },
  { id: '5', name: 'Hamba Allah', amount: 250000, timestamp: new Date() },
  { id: '6', name: 'Keluarga Besar Ahmad', amount: 5000000, timestamp: new Date() },
  { id: '7', name: 'Hamba Allah', amount: 100000, timestamp: new Date() },
];

export const TARGET_AMOUNT = 500000000; // 500 Million
export const CURRENT_AMOUNT = 325450000; // 325 Million