type ProductImageModel = {
  createdAt: string;
  id: number;
  image: string;
  isPrimary: boolean;
  productId: number;
  updatedAt: string;
};

type ProductModel = {
  createdAt: string;
  deletedAt: string | null;
  description: string;
  id: number;
  name: string;
  productCategoryId: number;
  product_images: ProductImageModel[];
  updatedAt: string | null;
  variant: string;
};

export type { ProductModel, ProductImageModel };
