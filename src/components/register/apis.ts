import { request } from "@/config/request"

export interface RegisterForm {
      username: string;
      password: string;
      confirm_password: string;
      real_name: string;
      department: string;
      mail: string;
}

export const RegisterApi = (register: RegisterForm) => {
      return request({
            url: "/register",
            method: "POST",
            data: register
      })
}