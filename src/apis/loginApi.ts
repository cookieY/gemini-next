import { request } from "@/config/request"

export interface LoginFrom {
      username: string;
      password: string;
      is_ldap: boolean;
}

export const LoginApi = (login: LoginFrom) => {
      return request({
            url: login.is_ldap ? "/ldap" : "/login",
            method: "POST",
            data: login
      })
}

export const IsRegister = () => {
      return request({
            url: "/fetch",
            method: "GET",
      })
}