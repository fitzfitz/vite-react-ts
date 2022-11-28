type ProductImageType = {
  createdAt: string;
  id: number;
  image: string;
  isPrimary: boolean;
  productId: number;
  updatedAt: string;
};

type ProductPriceType = {
  createdAt: string | null;
  id: number;
  price: string | number;
  productId: number;
  resellerId: number;
  updatedAt: string | null;
};

type ProductType = {
  createdAt: string;
  deletedAt: string | null;
  description: string;
  id: number;
  name: string;
  productCategoryId: number;
  product_images: ProductImageType[];
  product_price: ProductPriceType | undefined;
  updatedAt: string | null;
  slug: string;
  price: number;
  variant: string;
};

type ProductListResponseType = {
  data?: {
    data: ProductType[];
    total: number;
  } | null;
  success?: boolean;
};

type ProductDetailResponseType = {
  data?: ProductType;
  success?: boolean;
};

type ProductErrorType = {
  message?: string;
  success?: boolean;
};

export type {
  ProductListResponseType,
  ProductDetailResponseType,
  ProductType,
  ProductImageType,
  ProductPriceType,
  ProductErrorType,
};
