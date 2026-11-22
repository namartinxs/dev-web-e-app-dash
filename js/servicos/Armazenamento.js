class Armazenamento{
    ler(chave,padrao){
        try{
            const bruto = localStorage.getItem(chave);
            return bruto === null ? padrao : JSON.parse(bruto);

        }catch(error){
            return padrao;
        }
    }

    gravar(chave,padrao){
        try{
            localStorage.setItem(chave,JSON.stringify(valor));
            return true;

        }catch(error){
            return false;
        }
    }
}