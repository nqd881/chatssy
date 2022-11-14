export type UpdateUserProfileData = Partial<{
  firstName: string;
  lastName: string;
  birthDate: Date;
  address: UpdateUserProfileAddressData;
}>;

export type UpdateUserProfileAddressData = Partial<{
  countryCode: string;
  state: string;
  city: string;
  streetLine1: string;
  streetLine2: string;
  postalCode: string;
}>;
