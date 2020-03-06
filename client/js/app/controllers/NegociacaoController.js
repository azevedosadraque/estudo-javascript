class NegociacaoController {
    
    constructor() {
        
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        
        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')),
            'adiciona', 'esvazia', 'ordena');

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto'
        );

        this._controleOrdenacao = new Ordenacao();

        this._service = new NegociacaoService();

        this._init();

    }
    
    _init(){
        
        this._service
            .lista()
            .then(negociacoes => 
                negociacoes.forEach(negociacao =>
                    this._listaNegociacoes.adiciona(negociacao)))
            .catch(erro => this._mensagem.texto = erro);
    
            setInterval(() => {
                this.importarNegociacoes();
            }, 3000);
    }
    
    adiciona(event) {

        event.preventDefault();
        
        let negociacao = this._criaNegociacao();

        this._service
            .cadastra(negociacao)
            .then((mensagem) => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = mensagem;
                this._limpaFormulario;
            })
            .catch(erro => this._mensagem.texto = erro);
    }

    importarNegociacoes(){

        this._service
            .importa(this._listaNegociacoes.negociacoes)
            .then(negociacoes => {
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                this._mensagem.texto = 'Negociações do período importadas com sucesso';
                })
                .catch(error => this._mensagem.texto = error);

    }
    
    apaga() {


        this._service
            .apaga()
            .then(mensagem => {
                this._mensagem.texto = mensagem;
                this._listaNegociacoes.esvazia();
            })
            .catch(erro => this.mensagem.texto = erro);                
    }
    
    _criaNegociacao() {

        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            parseInt(this._inputQuantidade.value),      
            parseFloat(this._inputValor.value));    
    }
    
    _limpaFormulario() {
     
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();   
    }

    ordenarLista(coluna) {

        this._controleOrdenacao.coluna = coluna;
        
        this._listaNegociacoes.ordena(coluna, this._controleOrdenacao.ordem);
    }
}