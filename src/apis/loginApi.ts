import { request } from "@/config/request"

export interface LoginFrom {
      username: string;
      password: string;
      is_ldap: boolean;
      is_oidc: boolean;
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

export const OidcStateApi = () => {
      return request({
            url: "/oidc/state",
            method: "GET"
      })
} 