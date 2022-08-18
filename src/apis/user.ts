import { request, COMMON_URI } from "@/config/request"
import { commonPage } from "@/types"
import { AxiosPromise } from "axios"

export interface UserParams {
      page: number
      find: UserExpr
}

export interface UserExpr {
      dept: string
      username: string
      real_name: string
      email: string
}

export interface UserTableData {
      username: string
      id: string
      department: string
      real_name: string
      email: string
}

export interface UserResp {
      data: UserTableData[]
      page: number
}

export interface RegisterForm {
      username?: string;
      password: string;
      confirm_password: string;
      real_name: string;
      department: string;
      email: string;
      theme?: string;
      lang?: string
}

export interface Password {
      origin: string
      password: string;
      confirm_password: string;
}

export interface Target {
      auditor: string[]
      ddl_source: string[]
      dml_source: string[]
      query_source: string[]
}

export interface RespGroups {
      own: string[],
      groups: Groups[],
      target: Target,
}

export interface Groups {
      name: string
      id: number
}


export class Request {
      UserInfo (): AxiosPromise {
            return request({
                  method: 'get',
                  url: `${COMMON_URI}/fetch/userinfo`,
            })
      }
      Register (register: RegisterForm, isManager: boolean): AxiosPromise {
            return request({
                  url: isManager ? `${COMMON_URI}/manage/user?tp=add` : "/register",
                  method: "POST",
                  data: register
            })
      }

      Principal (): AxiosPromise {
            return request({
                  method: 'post',
                  url: `${COMMON_URI}/manage/user?tp=principal`,
            })
      }

      List (args: commonPage<UserExpr>): AxiosPromise {
            return request({
                  method: 'put',
                  url: `${COMMON_URI}/manage/user`,
                  data: args
            })
      }

      Edit (user: RegisterForm, isManager: boolean): AxiosPromise {
            return request({
                  url: isManager ? `${COMMON_URI}/manage/user?tp=edit` : `${COMMON_URI}/common/edit?tp=edit`,
                  method: "POST",
                  data: user
            })
      }

      GetGroup (user: string): AxiosPromise {
            return request({
                  url: `${COMMON_URI}/fetch/groups`,
                  method: "get",
                  params: { user: user }
            })
      }

      MargeGroup (groups: string[]): AxiosPromise {
            return request({
                  url: `${COMMON_URI}/manage/policy`,
                  method: "GET",
                  params: { group: groups.join(",") }
            })
      }

      EditGroup (groups: string[], user: string): AxiosPromise {
            return request({
                  url: `${COMMON_URI}/manage/user?tp=policy`,
                  method: "POST",
                  data: { group: groups, username: user }
            })
      }

      Password (password: Password, user: string, isManager: boolean): AxiosPromise {
            return request({
                  url: isManager ? `${COMMON_URI}/manage/user?tp=password` : `${COMMON_URI}/common/edit?tp=password`,
                  method: isManager ? "POST" : "PUT",
                  data: {
                        password: password.password,
                        origin: password.origin,
                        username: user
                  }
            })
      }

      Delete (user: string): AxiosPromise {
            return request({
                  url: `${COMMON_URI}/manage/user`,
                  method: "DELETE",
                  params: { user: user }
            })
      }
}