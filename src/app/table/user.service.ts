import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map } from 'rxjs'

export interface backEndResponse {
    "pagina": number,
    "totalGeralRegistro": 0,
    "registros": User[]
}

export interface User {
    "codigo": number,
    "codIgreja": number,
    "descricaoIgreja": string,
    "sexo": string,
    "matricula": string,
    "nome": string,
    "mae": string,
    "pai": string,
    "cep": string,
    "endereco": string,
    "numero": string,
    "complemento": string,
    "bairro": string,
    "cidade": string,
    "uf": string,
    "telefone": string,
    "celular": string,
    "telefoneRecado": string,
    "recado": string,
    "rg": string,
    "cpf": string,
    "email": string,
    "dataNascimento": Date,
    "tipoSanguineo": string,
    "doador": Boolean,
    "natural": string,
    "codEscolaridade": number,
    "codEstadoCivil": number,
    "descricaoEscolaridade": string,
    "descricaoEstadoCivil": string,
    "observacao": string,
    "apelido": string,
    "lat": number,
    "lng": number,
    "skype": string,
    "faceBook": string,
    "dataArrolamento": Date,
    "codArrolamento": string,
    "observacaoArrolamento": string,
    "dataAlteracao": Date,
    "dataPrimeiroArrolamento": Date
    "descricaoPrimeiroArrolamento": string
}
@Injectable()
export class UsersService {
    #users = new BehaviorSubject<User[]>([])
    users$ = this.#users.asObservable()

    constructor(private http: HttpClient) { 
        this.load()
    }
    token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOb21lVXN1YXJpbyI6IiIsIkJhbmNvIjoiU1VQTEVPTiIsIk5hbWVJZGVudGlmaWVyIjoiNSIsIlNpZCI6IjAxMGI1YjUxLWE0MGEtNDQxOC1iOTNkLWRjNzgyNzM3MWI1NCIsIlBlcm1pc3NvZXMiOiItMjAwMCwtNTAwMCIsIm5iZiI6MTY4NDg0MTI5OCwiZXhwIjoyMDAwNDYwNTU4LCJpc3MiOiJ3ZWJBcGkiLCJhdWQiOiJ3ZWJBcGkifQ.D_Mluf1HA3dKkKPMNqHRtXyJcWXjDONlLKPh6dpoqWA'
    headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token)

    load() {
        this.get().subscribe((users) => {
            this.#users.next(users)
        })
    }

    get() {
        return this.http.get<backEndResponse>(
            `https://gestaoweb.eklesiaonline.com.br/webapi/api/Integracoes/Pessoa`, {headers: this.headers}
        ).pipe(
            map(response => response.registros)
        )
    }
    getLength() {
        return this.http.get<backEndResponse>(
            `https://gestaoweb.eklesiaonline.com.br/webapi/api/Integracoes/Pessoa`, {headers: this.headers}
        ).pipe(
            map(response => response.totalGeralRegistro)
        )
    }
}