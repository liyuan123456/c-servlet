class Matrix{
    m
    constructor(matrix){
        this.m = matrix;
    }
    rowsNum(){
        if(!this.m){
            return;
        }
        return this.m.length;
    }
    colsNum(){
        if(!this.m){
            return;
        }
        return this.m[0].length;
    }
    transpose(){
        if(!this.m){
            return
        }
        const desArr = [];
        for(let j=0;j<this.colsNum();j++){
            desArr[j]=[];
            for(let i=0;i<this.rowsNum();i++){
                desArr[j][i] = this.m[i][j];
            }
        }
        return desArr;
    }
}

export {
    Matrix
}

