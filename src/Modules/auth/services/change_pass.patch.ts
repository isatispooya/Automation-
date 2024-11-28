import api from "../../../api/api";
import { server } from "../../../api/server";
import { ResetPassParams } from "../types/changePass.type";

export const patchChangePass = async ({
  newPass,
  confirmNewPass,
  smsCode,
}: ResetPassParams) => {
  const response = await api.patch(`${server}/forgot-password/`, {
    new_password: newPass,
    new_password_confirm: confirmNewPass,
    code: smsCode,
  });

  return response.data;
};