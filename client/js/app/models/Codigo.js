class Codigo{

    constructor(texto){

        if(!this._valida(texto)) throw new Error(`O texto ${texto} não é um código válido`);
        this._texto = texto;

    }

    _valida(texto){

        return /^\d{4}-\d{2}-\d{2}$/.test(texto);

    }

    _getTexto(){
        
        return this._texto;

    }

}