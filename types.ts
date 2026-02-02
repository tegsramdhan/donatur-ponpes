export interface DonationOption {
  value: number;
  label: string;
}

export interface Donor {
  id: string;
  name: string;
  amount: number;
  timestamp: Date;
  message?: string;
}

export interface PrayerRequest {
  name: string;
  intention: string;
}