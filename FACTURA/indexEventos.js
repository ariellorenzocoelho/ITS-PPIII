M.AutoInit();

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.parallax');
    var instances = M.Parallax.init(elems);
});

function helpElimina(){
    M.toast({
        html: 'Elimina esta factura!', displayLength: 1000, classes: 'rounded pink', inDuration: 000, outDuration: 000
    })
}

function helpEdita(){
    M.toast({
        html: 'Editar esta factura!', displayLength: 1000, classes: 'rounded light-blue', inDuration: 000, outDuration: 000
    })
}

function helpCancela(){
    M.toast({
        html: 'Cancela seleccion de factura!', displayLength: 1000, classes: 'rounded light-green', inDuration: 000, outDuration: 000
    })
} 