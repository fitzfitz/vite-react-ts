type ResellerType = {
  id: number;
  name: string;
  address: string;
  email: string;
  phoneNumber: string;
  tokopedia: string;
  shopee: string;
  instagram: string;
  username: string;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
};

type ResellerResponseType = {
  data?: ResellerType;
  success?: boolean;
};

export type { ResellerType, ResellerResponseType };
