import { request, COMMON_BASE_URI } from "@/config/request"

export interface LoginFrom {
      username: string;
      password: string;
      is_ldap: boolean;
      is_oidc: boolean;
}

export const LoginApi = (login: LoginFrom) => {
      return request({
            url: login.is_ldap ? `${COMMON_BASE_URI}/ldap` : `${COMMON_BASE_URI}/login`,
            method: "POST",
            data: login
      })
}

export const IsRegister = () => {
      return request({
            url: `${COMMON_BASE_URI}/fetch`,
            method: "GET",
      })
}

export const OidcStateApi = () => {
      return request({
            url: `${COMMON_BASE_URI}/oidc/state`,
            method: "GET"
      })
} 