import { HttpParams } from '@angular/common/http';
import { ITEMS_PER_PAGE_MAX } from 'app/shared';

export const createRequestOption = (req?: any): HttpParams => {
    let options: HttpParams = new HttpParams();
    if (req) {
        Object.keys(req).forEach(key => {
            if (key !== 'sort') {
                options = options.set(key, req[key]);
            }
        });
        if (req.sort) {
            req.sort.forEach(val => {
                options = options.append('sort', val);
            });
        }
    }
    return options;
};

export const optionNoSort = (req?: any): HttpParams => {
    let options: HttpParams = new HttpParams();
    if (req) {
        Object.keys(req).forEach(key => {
            options = options.set(key, req[key]);
        });
    }
    return options;
};

export const optionMax = (req?: any): HttpParams => {
    let options: HttpParams = new HttpParams();
    options = options.set('size', ITEMS_PER_PAGE_MAX.toString());
    if (req) {
        Object.keys(req).forEach(key => {
            if (key !== 'sort') {
                options = options.set(key, req[key]);
            }
        });
    }
    if (req.sort) {
        req.sort.forEach(val => {
            options = options.append('sort', val);
        });
    }
    return options;
};

export const optionMaxSortNum = (req?: any): HttpParams => {
    let options: HttpParams = new HttpParams();
    options = options.set('size', ITEMS_PER_PAGE_MAX.toString());
    options = options.append('sort', 'sortNum');
    options = options.append('sort', 'asc');
    if (req) {
        Object.keys(req).forEach(key => {
            if (key !== 'sort') {
                options = options.set(key, req[key]);
            }
        });
    }
    if (req.sort) {
        req.sort.forEach(val => {
            options = options.append('sort', val);
        });
    }
    return options;
};

export const optionMaxSortNumber = (req?: any): HttpParams => {
    let options: HttpParams = new HttpParams();
    options = options.set('size', ITEMS_PER_PAGE_MAX.toString());
    options = options.append('sort', 'sortNumber');
    options = options.append('sort', 'asc');
    if (req) {
        Object.keys(req).forEach(key => {
            if (key !== 'sort') {
                options = options.set(key, req[key]);
            }
        });
    }
    if (req.sort) {
        req.sort.forEach(val => {
            options = options.append('sort', val);
        });
    }
    return options;
};
