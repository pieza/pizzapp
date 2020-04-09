import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export class BaseHttpService<T extends any> {
    constructor(private httpClient: HttpClient, private url: string) {
        this.url = environment.apiPath + url;
    }

    /**
     * Get all elements in database.
     */
    find(params?: any): Observable<any> {
        return this.httpClient.get(this.url, { params, withCredentials: true });
    }

    /**
     * Get one element.
     * @param id Id of element.
     */
    findOne(id: string): Observable<any> {
        return this.httpClient.get(`${this.url}/${id}`, {
            withCredentials: true
          });
    }

    /**
     * Create a new object in database.
     * @param item Object to create.
     */
    create(item: T | FormData) {
        return this.httpClient.post(this.url, item, {
            withCredentials: true
          });
    }

    /**
     * Updates an object in database.
     * @param id Id of element.
     * @param item New data of element.
     */
    update(id: string, item: T | FormData) {
        return this.httpClient.put(`${this.url}/${id}`, item, {
            withCredentials: true
          });
    }

    /**
     * Deletes an object in database.
     * @param id Id of element.
     */
    delete(id: string): Observable<any> {
        return this.httpClient.delete(`${this.url}/${id}`, {
            withCredentials: true
          });
    }
}
