import { request, COMMON_URI, Res } from '@/config/request';
import { CommonPage } from '@/types';

export interface UserParams {
  page: number;
  find: UserExpr;
}

export interface UserExpr {
  dept: string;
  username: string;
  real_name: string;
  email: string;
}

export interface UserTableData {
  username: string;
  id: string;
  department: string;
  real_name: string;
  email: string;
}

export interface UserResp {
  data: UserTableData[];
  page: number;
}

export interface RegisterForm {
  username?: string;
  password: string;
  confirm_password: string;
  real_name: string;
  department: string;
  email: string;
  theme?: string;
  lang?: string;
}

export interface IUserProfile {
  user: RegisterForm;
}

export interface Password {
  origin: string;
  password: string;
  confirm_password: string;
}

export interface Target {
  auditor: string[];
  ddl_source: string[];
  dml_source: string[];
  query_source: string[];
}

export interface RespGroups {
  own: string[];
  groups: Groups[];
  target: Target;
}

export interface Groups {
  name: string;
  id: number;
}

export interface IUpdatePassword {
  password: Password;
  username: string;
  isManager: boolean;
}

export function updatePassword(params: IUpdatePassword) {
  return request({
    url: params.isManager
      ? `${COMMON_URI}/manage/user?tp=password`
      : `${COMMON_URI}/common/edit?tp=password`,
    method: params.isManager ? 'POST' : 'PUT',
    data: {
      password: params.password.password,
      origin: params.password.origin,
      username: params.username,
    },
  });
}

export function getUserGroups(user: string) {
  return request.get(`${COMMON_URI}/fetch/groups`, {
    params: { user: user },
  });
}

export function updateUserGroups(groups: string[], user: string) {
  return request.post(`${COMMON_URI}/manage/user?tp=policy`, {
    group: groups,
    username: user,
  });
}

export function deleteUserAccount(user: string) {
  return request.delete(`${COMMON_URI}/manage/user`, {
    params: { user: user },
  });
}

export function getUserInfo() {
  return request.get(`${COMMON_URI}/fetch/userinfo`);
}

export function getUserList(params: CommonPage<UserExpr>) {
  return request.put<Res<UserResp>>(`${COMMON_URI}/manage/user`, params);
}

export function updateUserInfo(user: RegisterForm, isManager: boolean) {
  return request.post(
    isManager
      ? `${COMMON_URI}/manage/user?tp=edit`
      : `${COMMON_URI}/common/edit?tp=edit`,
    user
  );
}

export function updateUserPrincipal() {
  return request.post(`${COMMON_URI}/manage/user?tp=principal`);
}

export function signUpUser(register: RegisterForm, isManager: boolean) {
  return request.post(
    isManager ? `${COMMON_URI}/manage/user?tp=add` : '/register',
    register
  );
}

// export function queryMargeGroup(groups: string[]) {
//   return request.get(`${COMMON_URI}/manage/policy`, {
//     params: { group: groups.join(',') },
//   });
// }
