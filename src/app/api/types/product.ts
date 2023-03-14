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

type ProductItemType = {
  id: number;
  description: string;
  enable: boolean;
  price: string;
  productId: number;
  resellerId: number;
  link?: string;
  shopee?: string;
  tokopedia?: string;
  updatedAt?: string;
  createdAt?: string;
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
  createdAt: string | null;
  deletedAt: string | null;
  updatedAt: string | null;
  id: number;
  name: string;
  description: string;
  productCategoryId: number;
  basicPrice: string | null;
  catalogPrice: string | null;
  minLivePrice: string | null;
  olshopPrice: string | null;
  slug: string;
  variant: string;
  code: string | null;
  isSold: boolean;
  productImage: ProductImageType[];
  productItem?: ProductItemType;
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
