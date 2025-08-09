export interface Product {
  sku: string;
  name: string;
  description?: string;
  price?: number;
  category: string; // bleibt optional
  brand?: string;
  stockQuantity?: number;
  shelfLocation?: string;
  isColdStorage?: boolean;
  targetAnimal?: string;
  recommendedAgeGroup?: string;
  weightGrams?: number;
  packSize?: number;
  imageUrl?: string;
  tags?: string[];
  reason?: string;
}
