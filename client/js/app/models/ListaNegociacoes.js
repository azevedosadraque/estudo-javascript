class ListaNegociacoes {

    constructor() {
        
        this._negociacoes = [];
    }

    adiciona(negociacao) {
        
        this._negociacoes.push(negociacao);
    }

    get negociacoes() {
        
        return [].concat(this._negociacoes);
    }

    esvazia() {
        
        this._negociacoes = [];
    }

    get volumeTotal() {
        return this._negociacoes.reduce((total, n) => total + n.volume, 0.0);
    }

    ordena(coluna, ordem){

        console.log(coluna, ordem)
        
        if(ordem == 'crescente')
            this._negociacoes = this._negociacoes.sort((a, b) => a[coluna] - b[coluna]);
        else
            this._negociacoes = this._negociacoes.sort((a, b) => b[coluna] - a[coluna]);

    }
}