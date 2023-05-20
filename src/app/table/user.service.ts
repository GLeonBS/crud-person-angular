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
    "descricaoIgreja": String,
    "sexo": String,
    "matricula": String,
    "nome": String,
    "mae": String,
    "pai": String,
    "cep": String,
    "endereco": String,
    "numero": String,
    "complemento": String,
    "bairro": String,
    "cidade": String,
    "uf": String,
    "telefone": String,
    "celular": String,
    "telefoneRecado": String,
    "recado": String,
    "rg": String,
    "cpf": String,
    "email": String,
    "dataNascimento": Date,
    "tipoSanguineo": String,
    "doador": Boolean,
    "natural": String,
    "codEscolaridade": number,
    "codEstadoCivil": number,
    "descricaoEscolaridade": String,
    "descricaoEstadoCivil": String,
    "observacao": String,
    "apelido": String,
    "lat": number,
    "lng": number,
    "skype": String,
    "faceBook": String,
    "dataArrolamento": Date,
    "codArrolamento": String,
    "observacaoArrolamento": String,
    "dataAlteracao": Date,
    "dataPrimeiroArrolamento": Date
    "descricaoPrimeiroArrolamento": String
}
@Injectable()
export class UsersService {
    #users = new BehaviorSubject<User[]>([])
    users$ = this.#users.asObservable()

    constructor(private http: HttpClient) { }
    token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOb21lVXN1YXJpbyI6IiIsIkJhbmNvIjoiU1VQTEVPTiIsIk5hbWVJZGVudGlmaWVyIjoiNSIsIlNpZCI6ImNhYzhlYWE3LWQ0NjktNDkyOS1iYjI4LWEzMzY5NjdhNDllZiIsIlBlcm1pc3NvZXMiOiItMjAwMCwtNTAwMCIsIm5iZiI6MTY4NDU5MDYzMCwiZXhwIjoyMDAwMjA5ODkwLCJpc3MiOiJ3ZWJBcGkiLCJhdWQiOiJ3ZWJBcGkifQ.6lF_XKJM4wTolhp_35-pLA-Z9FedfwMKpy_XHs3X0Ck'
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