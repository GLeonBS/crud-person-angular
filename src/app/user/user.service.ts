import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map } from 'rxjs'

export interface backEndResponse {
    "pagina": number,
    "totalGeralRegistro": 0,
    "registros": User[]
}

export interface User {

}
@Injectable()
export class UsersService {
    #users = new BehaviorSubject<User[]>([])
    users$ = this.#users.asObservable()

    constructor(private http: HttpClient) {
        this.load()
    }

    load() {
        this.get().subscribe((users) => {
            this.#users.next(users)
        })
    }

    get() {
        return this.http.get<backEndResponse>(
            `http://localhost:3000/api/person`
        ).pipe(
            map(response => response.registros)
        )
    }
}