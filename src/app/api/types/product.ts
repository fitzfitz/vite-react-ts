type ProductParamsType = {
  keyword?: string;
  page?: number;
  limit?: number;
  product_category_id?: number;
};

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
  price: string;
  productId: number;
  resellerId: number;
  updatedAt: string | null;
  description: string | null;
  enable: boolean;
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
  price: string;
  updatedAt: string | null;
  slug: string;
  variant: string;
};

type ProductCategoryType = {
  category: string;
  createdAt: string | null;
  deletedAt: string | null;
  id: number;
  image: string | null;
  updatedAt: string | null;
};

type ProductListResponseType = {
  data?: {
    data: ProductType[];
    total: number;
  } | null;
  success?: boolean;
};

type ProductErrorType = {
  message?: string;
  success?: boolean;
};

export type {
  ProductListResponseType,
  ProductType,
  ProductImageType,
  ProductPriceType,
  ProductErrorType,
  ProductParamsType,
  ProductCategoryType,
};
