import type { FinishingItem, PaperItem } from "./types";

export const initialPaperItems: PaperItem[] = [
  {
    id: "a4",
    name: "A4 Paper",
    active: true,
    bwPrice: "0.75",
    colorPrice: "10",
  },
  {
    id: "a3",
    name: "A3 Paper",
    active: false,
    bwPrice: "0",
    colorPrice: "0",
  },
  {
    id: "a5",
    name: "A5 Paper",
    active: false,
    bwPrice: "0",
    colorPrice: "0",
  },
  {
    id: "bond",
    name: "Bond Sheet",
    active: true,
    bwPrice: "1",
    colorPrice: "10",
  },
  {
    id: "photo",
    name: "Photo - 4 Photos",
    active: false,
    bwPrice: "0",
    colorPrice: "0",
  },
];

export const initialFinishingItems: FinishingItem[] = [
  {
    id: "spiral",
    name: "Spiral Binding",
    unit: "document set",
    active: true,
    price: "30",
  },
  {
    id: "soft",
    name: "Soft Binding",
    unit: "document set",
    active: true,
    price: "35",
  },
  {
    id: "hard",
    name: "Hard Binding",
    unit: "document set",
    active: false,
    price: "0",
  },
  {
    id: "lamination",
    name: "Lamination",
    unit: "page",
    active: false,
    price: "0",
  },
  {
    id: "stapling",
    name: "Stapling",
    unit: "document set",
    active: false,
    price: "0",
  },
];
