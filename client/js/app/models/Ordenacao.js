class Ordenacao{

    constructor(){

        this._coluna;
        this._ordem = 2;
    }

    get coluna(){

        return this._coluna;
    }

    set coluna(coluna){

        if(coluna == this._coluna){
            this._ordem++;
        }
        else
        { 
            this._coluna = coluna;
            this._ordem = 2;
        }
    }

    get ordem(){
        
        if(this._ordem % 2)
            return 'crescente'
        else
            return 'decrescente'
    }


}