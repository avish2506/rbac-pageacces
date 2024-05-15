import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map';
import { throwError } from 'rxjs/internal/observable/throwError';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "./data-store.service";
export class HttpService {
    http;
    _storeservice;
    RBACORG;
    overrideUrl = true;
    errorData;
    baseUrl = '';
    tokenKey;
    headers = new HttpHeaders()
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('role', 'role=CP_PUBLIC');
    showSpinner = new BehaviorSubject(false);
    outsideShowSpinner = new BehaviorSubject(false);
    url1;
    url;
    constructor(http, _storeservice) {
        this.http = http;
        this._storeservice = _storeservice;
        this._storeservice.currentStore.subscribe((res) => {
            if (res['RBACORG'] && res['RBACORG'] !== '') {
                this.RBACORG = res['RBACORG'];
                this.url = this.RBACORG['apiHost'] ? this.RBACORG['apiHost'] : 'http://localhost:3000/api';
                this.tokenKey = this.RBACORG['tokenKey'];
            }
        });
        this.url1 = '';
    }
    get(apiRoute) {
        return this.http.get(`${this.url + apiRoute}`, {
            headers: this.getHttpNewHeaders()
        });
    }
    post(apiRoute, body) {
        return this.http.post(`${this.url + apiRoute}`, body, {
            headers: this.getHttpNewHeaders()
        });
    }
    put(apiRoute, body) {
        return this.http.put(`${this.url + apiRoute}`, body, {
            headers: this.getHttpNewHeaders()
        });
    }
    patch(apiRoute, body) {
        return this.http.patch(`${this.url + apiRoute}`, body, {
            headers: this.getHttpNewHeaders()
        });
    }
    delete(apiRoute) {
        return this.http.delete(`${this.url + apiRoute}`, {
            headers: this.getHttpNewHeaders()
        });
    }
    getHttpHeaders() {
        return new HttpHeaders().set('key', 'value');
    }
    getHttpNewHeaders() {
        return this.headers.set('Authorization', `Bearer ${this.getToken()}`);
    }
    getAttachmentHttpHeaders(contentType) {
        return new HttpHeaders().set('Content-Type', contentType).set('x-ms-blob-type', 'BlockBlob');
    }
    putUpload(apiRoute, body, contentType) {
        return this.http.put(`${this.url1 + apiRoute}`, body, { headers: this.getAttachmentHttpHeaders(contentType) });
    }
    putupload2(apiRoute, body, contenttype) {
        return this.http
            .put(`${this.url1 + apiRoute}`, body, {
            headers: this.getAttachmentHttpHeaders(contenttype),
            observe: 'response'
        })
            .pipe(map(data => {
            return data;
        }));
    }
    /**
     *
     * @param apiRoute
     * This function will download the stream file from the API service.
     * No HTTP required for this stream. So used Window.location.href to download the file
     */
    getFormDownloaded(apiRoute) {
        window.location.href = `${this.url + apiRoute}`;
    }
    //common http service(optional)
    handleError(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Client-side errors
            errorMessage = `Error: ${error.error.message}`;
        }
        else {
            // Server-side errors
            errorMessage = `Error Code: ${error.status}\nMessage: ${error?.error?.message ? error?.error?.message : error.message}`;
        }
        return throwError(errorMessage);
    }
    getToken() {
        const token = this.tokenKey ? this.tokenKey : 'jwt-token';
        return sessionStorage.getItem(token);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: HttpService, deps: [{ token: i1.HttpClient }, { token: i2.DataStoreService }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: HttpService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: HttpService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.DataStoreService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGljcy1jb3JlL3JiYWMtcGFnZWFjY2Vzcy9zcmMvbGliL3BpY3MtcmJhYy1wYWdlYWNjZXNzL0Bjb3JlL3NlcnZpY2UvaHR0cC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBaUMsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZUFBZSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ25ELE9BQU8sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUlyQyxNQUFNLE9BQU8sV0FBVztJQWVBO0lBQTBCO0lBZDlDLE9BQU8sQ0FBTTtJQUNiLFdBQVcsR0FBRyxJQUFJLENBQUM7SUFDbkIsU0FBUyxDQUFxQjtJQUM5QixPQUFPLEdBQUcsRUFBRSxDQUFDO0lBQ2IsUUFBUSxDQUFNO0lBQ1AsT0FBTyxHQUFHLElBQUksV0FBVyxFQUFFO1NBQy9CLEdBQUcsQ0FBQyxRQUFRLEVBQUUsa0JBQWtCLENBQUM7U0FDakMsR0FBRyxDQUFDLGNBQWMsRUFBRSxrQkFBa0IsQ0FBQztTQUN2QyxHQUFHLENBQUMsTUFBTSxFQUFFLGdCQUFnQixDQUFDLENBQUM7SUFFMUIsV0FBVyxHQUE2QixJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUM1RSxrQkFBa0IsR0FBNkIsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7SUFDMUYsSUFBSSxDQUFTO0lBQ2IsR0FBRyxDQUFNO0lBQ1QsWUFBb0IsSUFBZ0IsRUFBVSxhQUErQjtRQUF6RCxTQUFJLEdBQUosSUFB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O1FBQ0QsT0FBTyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUNELFFBQVE7UUFDTixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUM7UUFDMUQsT0FBTyxjQUFjLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7d0dBNUdRLFdBQVc7NEdBQVgsV0FBVzs7NEZBQVgsV0FBVztrQkFEdkIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBFcnJvclJlc3BvbnNlLCBIdHRwSGVhZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tYXAnO1xyXG5pbXBvcnQgeyB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcy9pbnRlcm5hbC9vYnNlcnZhYmxlL3Rocm93RXJyb3InO1xyXG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IERhdGFTdG9yZVNlcnZpY2UgfSBmcm9tICcuL2RhdGEtc3RvcmUuc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBIdHRwU2VydmljZSB7XHJcbiAgICBSQkFDT1JHOiBhbnk7XHJcbiAgICBvdmVycmlkZVVybCA9IHRydWU7XHJcbiAgICBlcnJvckRhdGEhOiBIdHRwRXJyb3JSZXNwb25zZTtcclxuICAgIGJhc2VVcmwgPSAnJztcclxuICAgIHRva2VuS2V5OiBhbnk7XHJcbiAgICBwdWJsaWMgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpXHJcbiAgICAgIC5zZXQoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uJylcclxuICAgICAgLnNldCgnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKVxyXG4gICAgICAuc2V0KCdyb2xlJywgJ3JvbGU9Q1BfUFVCTElDJyk7XHJcblxyXG4gICAgcHVibGljIHNob3dTcGlubmVyOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcclxuICAgIHB1YmxpYyBvdXRzaWRlU2hvd1NwaW5uZXI6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xyXG4gICAgdXJsMTogc3RyaW5nO1xyXG4gICAgdXJsOiBhbnk7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsIHByaXZhdGUgX3N0b3Jlc2VydmljZTogRGF0YVN0b3JlU2VydmljZSkge1xyXG4gICAgICB0aGlzLl9zdG9yZXNlcnZpY2UuY3VycmVudFN0b3JlLnN1YnNjcmliZSgocmVzOiBhbnkpID0+IHtcclxuICAgICAgICBpZiAocmVzWydSQkFDT1JHJ10gJiYgcmVzWydSQkFDT1JHJ10gIT09ICcnKSB7XHJcbiAgICAgICAgICB0aGlzLlJCQUNPUkcgPSByZXNbJ1JCQUNPUkcnXTtcclxuICAgICAgICAgIHRoaXMudXJsID0gdGhpcy5SQkFDT1JHWydhcGlIb3N0J10gPyB0aGlzLlJCQUNPUkdbJ2FwaUhvc3QnXSA6ICdodHRwOi8vbG9jYWxob3N0OjMwMDAvYXBpJztcclxuICAgICAgICAgIHRoaXMudG9rZW5LZXkgPSB0aGlzLlJCQUNPUkdbJ3Rva2VuS2V5J107XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy51cmwxID0gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0KGFwaVJvdXRlOiBzdHJpbmcpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYCR7dGhpcy51cmwgKyBhcGlSb3V0ZX1gLCB7XHJcbiAgICAgICAgaGVhZGVyczogdGhpcy5nZXRIdHRwTmV3SGVhZGVycygpXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHBvc3QoYXBpUm91dGU6IHN0cmluZywgYm9keTogYW55KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChgJHt0aGlzLnVybCArIGFwaVJvdXRlfWAsIGJvZHksIHtcclxuICAgICAgICBoZWFkZXJzOiB0aGlzLmdldEh0dHBOZXdIZWFkZXJzKClcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHV0KGFwaVJvdXRlOiBzdHJpbmcsIGJvZHk6IGFueSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5odHRwLnB1dChgJHt0aGlzLnVybCArIGFwaVJvdXRlfWAsIGJvZHksIHtcclxuICAgICAgICBoZWFkZXJzOiB0aGlzLmdldEh0dHBOZXdIZWFkZXJzKClcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcGF0Y2goYXBpUm91dGU6IHN0cmluZywgYm9keT86IGFueSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5odHRwLnBhdGNoKGAke3RoaXMudXJsICsgYXBpUm91dGV9YCwgYm9keSwge1xyXG4gICAgICAgIGhlYWRlcnM6IHRoaXMuZ2V0SHR0cE5ld0hlYWRlcnMoKVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGUoYXBpUm91dGU6IHN0cmluZykge1xyXG4gICAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZShgJHt0aGlzLnVybCArIGFwaVJvdXRlfWAsIHtcclxuICAgICAgICBoZWFkZXJzOiB0aGlzLmdldEh0dHBOZXdIZWFkZXJzKClcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SHR0cEhlYWRlcnMoKTogSHR0cEhlYWRlcnMge1xyXG4gICAgICByZXR1cm4gbmV3IEh0dHBIZWFkZXJzKCkuc2V0KCdrZXknLCAndmFsdWUnKTtcclxuICAgIH1cclxuICAgIGdldEh0dHBOZXdIZWFkZXJzKCk6IEh0dHBIZWFkZXJzIHtcclxuICAgICAgcmV0dXJuIHRoaXMuaGVhZGVycy5zZXQoJ0F1dGhvcml6YXRpb24nLCBgQmVhcmVyICR7dGhpcy5nZXRUb2tlbigpfWApO1xyXG4gICAgfVxyXG4gICAgZ2V0QXR0YWNobWVudEh0dHBIZWFkZXJzKGNvbnRlbnRUeXBlOiBhbnkpOiBIdHRwSGVhZGVycyB7XHJcbiAgICAgIHJldHVybiBuZXcgSHR0cEhlYWRlcnMoKS5zZXQoJ0NvbnRlbnQtVHlwZScsIGNvbnRlbnRUeXBlKS5zZXQoJ3gtbXMtYmxvYi10eXBlJywgJ0Jsb2NrQmxvYicpO1xyXG4gICAgfVxyXG4gICAgcHV0VXBsb2FkKGFwaVJvdXRlOiBzdHJpbmcsIGJvZHk6IGFueSwgY29udGVudFR5cGU6IGFueSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5odHRwLnB1dChgJHt0aGlzLnVybDEgKyBhcGlSb3V0ZX1gLCBib2R5LCB7IGhlYWRlcnM6IHRoaXMuZ2V0QXR0YWNobWVudEh0dHBIZWFkZXJzKGNvbnRlbnRUeXBlKSB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdXR1cGxvYWQyKGFwaVJvdXRlOiBzdHJpbmcsIGJvZHk6IGFueSwgY29udGVudHR5cGU6IGFueSk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgICAucHV0KGAke3RoaXMudXJsMSArIGFwaVJvdXRlfWAsIGJvZHksIHtcclxuICAgICAgICAgIGhlYWRlcnM6IHRoaXMuZ2V0QXR0YWNobWVudEh0dHBIZWFkZXJzKGNvbnRlbnR0eXBlKSxcclxuICAgICAgICAgIG9ic2VydmU6ICdyZXNwb25zZSdcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgbWFwKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBhcGlSb3V0ZVxyXG4gICAgICogVGhpcyBmdW5jdGlvbiB3aWxsIGRvd25sb2FkIHRoZSBzdHJlYW0gZmlsZSBmcm9tIHRoZSBBUEkgc2VydmljZS5cclxuICAgICAqIE5vIEhUVFAgcmVxdWlyZWQgZm9yIHRoaXMgc3RyZWFtLiBTbyB1c2VkIFdpbmRvdy5sb2NhdGlvbi5ocmVmIHRvIGRvd25sb2FkIHRoZSBmaWxlXHJcbiAgICAgKi9cclxuICAgIGdldEZvcm1Eb3dubG9hZGVkKGFwaVJvdXRlOiBzdHJpbmcpIHtcclxuICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgJHt0aGlzLnVybCArIGFwaVJvdXRlfWA7XHJcbiAgICB9XHJcbiAgICAvL2NvbW1vbiBodHRwIHNlcnZpY2Uob3B0aW9uYWwpXHJcblxyXG4gICAgaGFuZGxlRXJyb3IoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKSB7XHJcbiAgICAgIGxldCBlcnJvck1lc3NhZ2UgPSAnJztcclxuICAgICAgaWYgKGVycm9yLmVycm9yIGluc3RhbmNlb2YgRXJyb3JFdmVudCkge1xyXG4gICAgICAgIC8vIENsaWVudC1zaWRlIGVycm9yc1xyXG4gICAgICAgIGVycm9yTWVzc2FnZSA9IGBFcnJvcjogJHtlcnJvci5lcnJvci5tZXNzYWdlfWA7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gU2VydmVyLXNpZGUgZXJyb3JzXHJcbiAgICAgICAgZXJyb3JNZXNzYWdlID0gYEVycm9yIENvZGU6ICR7ZXJyb3Iuc3RhdHVzfVxcbk1lc3NhZ2U6ICR7XHJcbiAgICAgICAgICBlcnJvcj8uZXJyb3I/Lm1lc3NhZ2UgPyBlcnJvcj8uZXJyb3I/Lm1lc3NhZ2UgOiBlcnJvci5tZXNzYWdlXHJcbiAgICAgICAgfWA7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyb3JNZXNzYWdlKTtcclxuICAgIH1cclxuICAgIGdldFRva2VuKCk6IGFueSB7XHJcbiAgICAgIGNvbnN0IHRva2VuID0gdGhpcy50b2tlbktleSA/IHRoaXMudG9rZW5LZXkgOiAnand0LXRva2VuJztcclxuICAgICAgcmV0dXJuIHNlc3Npb25TdG9yYWdlLmdldEl0ZW0odG9rZW4pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiJdfQ==