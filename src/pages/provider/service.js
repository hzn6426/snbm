import { constant, getCache, hasCache, idelete, iget, ipost, iput, isearch, rmap, setCache,removeCache } from '@/common/utils';
import { from, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
//条件查询
export function searchProvider(conditions) {
  return isearch(constant.API_PROVIDER_SEARCH, conditions);
}

//保存或更新
export function saveOrUpdateProvider(provider) {
  removeCache(constant.KEY_PROVIDER);
  return provider && provider.id ? iput(constant.API_PROVIDER, provider) : ipost(constant.API_PROVIDER, provider);
  
}

//获取明细
export function getProvider(id) {
  return iget(`${constant.API_PROVIDER}/${id}`);
}

//删除供应商
export function deleteProvider(ids) {
  removeCache(constant.KEY_PROVIDER);
  return idelete(constant.API_PROVIDER, ids);
}

// 模糊匹配
export function listByKeyword(keyword) {
  let cacheKey;
  if (!keyword) {
    cacheKey = constant.KEY_PROVIDER;
    if (hasCache(cacheKey)) {
      return of(getCache(cacheKey));
    }
  }
  return iget(`${constant.API_PROVIDER_LIST_BY_KEY_WORD}?keyWord=${keyword}`).pipe(
    map((data) => {
      const theData = data || [];
      return rmap(
        (item) => ({
          label: `${item.simpleName}`,
          value: `${item.id}`,
        }),
        theData,
      );
    }),
    tap((v) => cacheKey && setCache(cacheKey, v)),
  );
}