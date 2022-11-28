type ResellerType = {
  id: number;
  name: string;
};

type ResellerResponseType = {
  data?: ResellerType;
  success?: boolean;
};

export type { ResellerType, ResellerResponseType };
