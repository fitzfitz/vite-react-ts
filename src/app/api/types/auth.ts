type AuthParamsType = {
  username: string;
  password: string;
};

type AuthUserDataType = {
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

type AuthResponseType = {
  accessToken: string;
  data: AuthUserDataType;
  expiresAt: number;
  refreshToken: string;
  success: boolean;
};

type AuthDefaultState = {
  user: AuthUserDataType | null;
  token: string | null;
  expiresAt: number | null;
};

export type {
  AuthDefaultState,
  AuthUserDataType,
  AuthResponseType,
  AuthParamsType,
};
