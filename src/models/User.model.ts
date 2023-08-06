type UserResponse = {
  avatar: string;
  bio: string;
  contactNumber: string;
  dialCode: string;
  dialCodeCountry: string;
  dialCountryCode: number;
  email: string;
  firstName: string;
  lastName: string;
  status?: 0 | 1;
  title: string;
  updatedAt: string;
  uuid: string;
};

export type { UserResponse };
