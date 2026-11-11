export interface PaperItem {
  id: string;
  name: string;
  active: boolean;
  bwPrice: string;
  colorPrice: string;
}

export type FinishingUnit = "document set" | "page";

export interface FinishingItem {
  id: string;
  name: string;
  unit: FinishingUnit;
  active: boolean;
  price: string;
}
