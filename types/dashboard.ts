export interface StatCardData {
  title: string;
  value: string;
  subtitle: string;
  icon: string;
  color?: string;
}

export interface Order {
  id: string;
  customer: string;
  phone: string;
  service: string;
  amount: string;
  status: string;
}