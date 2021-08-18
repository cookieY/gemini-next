import { request } from "@/config/request"

export interface LoginFrom {
      username: string;
      password: string;
      is_ldap: boolean;
}

export interface RegisterForm {
      username: string;
      password: string;
      confirm_password: string;
      real_name: string;
      department: string;
      mail: string;
}

export interface LoginRespPayload {
      token: string;
      real_name: string;
      rule: string;
}


export const LoginApi = (login: LoginFrom) => {
      return request({
            url: login.is_ldap ? "/ldap" : "/login",
            method: "POST",
            data: login
      })
}

export const RegisterApi = (register: RegisterForm) => {
      return request({
            url: "/register",
            method: "POST",
            data: register
      })
}

export const IsRegister = () => {
      return request({
            url: "/fetch",
            method: "GET",
      })
}