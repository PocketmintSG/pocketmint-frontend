export interface ProfileResetPasswordCredentials {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface UpdateProfileDetails {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}