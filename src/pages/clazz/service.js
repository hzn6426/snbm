import { constant, getCache, hasCache, idelete, iget, ipost, iput, isearch, rmap, setCache,removeCache } from '@/common/utils';
import { from, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
//条件查询
export function searchClass(conditions) {
    return isearch(constant.API_CLASS_SEARCH, conditions);
}

//保存或更新
export function saveOrUpdateClass(clazz) {
    removeCache(constant.KEY_CLASS);
    return clazz && clazz.id ? iput(constant.API_CLASS, clazz) : ipost(constant.API_CLASS, clazz);
}

//获取明细
export function getClass(id) {
    return iget(`${constant.API_CLASS}/${id}`);
}

//删除供应商
export function deleteClass(ids) {
    removeCache(constant.KEY_CLASS);
    return idelete(constant.API_CLASS, ids);
}

// 模糊匹配
export function listByKeyword(keyword) {
    let cacheKey;
    if (!keyword) {
        cacheKey = constant.KEY_CLASS;
        if (hasCache(cacheKey)) {
            return of(getCache(cacheKey));
        }
    }
    return iget(`${constant.API_CLASS_LIST_BY_KEY_WORD}?keyWord=${keyword}`).pipe(
        map((data) => {
            const theData = data || [];
            return rmap(
                (item) => ({
                    label: `${item.className}`,
                    value: `${item.id}`,
                }),
                theData,
            );
        }),
        tap((v) => cacheKey && setCache(cacheKey, v)),
    );
}