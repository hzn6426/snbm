import { constant, getCache, hasCache, iget, ilogin, ipost, iput, opost, rmap, setCache } from '@/common/utils';
import { from, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

//登录
export function login(params, tag) {
  return ilogin(constant.API_LOGIN, params, { HEADER_USER_SYSTEM_TAG: tag });
}
//登出
export function logout() {
  return ipost(constant.API_LOGOUT);
}
// 组织列表
export function userDepartments() {
  return iget(constant.API_USER_DEPARTMENTS);
}
// 切换组织
export function changeDepartment(gid) {
  return iget(`${constant.API_USER_CHANGE_DEPARTMENT}?gid=${gid}`);
}

//获取用户权限按钮
export function loadUserMenus() {
  return iget(constant.API_USER_MENUS);
}
//获取用户权限按钮列表
export function loadUserButtons() {
  return iget(constant.API_USER_BUTTONS);
}
//获取当前用户
export function getCurrentUser() {
  return iget(constant.API_USER_CURRENT);
}
//更新当前用户信息
export function updateSelfUser(user) {
  return iput(constant.API_USER_UPDATE_SELF, user);
}

export function treeAllGroupsAndUsersByTag(tag) {
  return iget(`${constant.API_USER_TREE_ALL_GROUPS_AND_USERS_BY_TAG}?utag=${tag}`);
}

//根据用户信息获取可用的组织列表
export function validateUserForDepartments(user) {
  return opost(constant.API_USER_VALIDATE_FOR_USER_DEPARTMENTS, user);
}

export function validateUserEmail(email) {
  return ipost(constant.API_USER_EMAIL_VALIDATE, email);
}

//根据ID获取用户
export function getUser(id) {
  return iget(`${constant.API_USER}/${id}`)
}

//根据用户编码获取用户
export function getByCode(code) {
  return iget(`${constant.API_USER_GET_BY_CODE}?code=${code}`)
}

// 模糊匹配
export function listByKeyword(tag, keyword) {
  let cacheKey;
  if (!keyword) {
    cacheKey = constant.KEY_USER + tag;
    if (hasCache(cacheKey)) {
      return of(getCache(cacheKey));
    }
  }
  return iget(`${constant.API_USER_LIST_BY_KEYWORD}?userTag=${tag}&keyWord=${keyword}`).pipe(
    map((data) => {
      const theData = data || [];
      return rmap(
        (item) => ({
          label: `${item.userRealCnName}`,
          value: `${item.userName}`,
        }),
        theData,
      );
    }),
    tap((v) => cacheKey && setCache(cacheKey, v)),
  );
}

