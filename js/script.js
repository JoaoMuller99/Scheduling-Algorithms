const corProcessando = "blue";
const corEsperando = "gray";
const corSemAtividade = "white";
var verificaEstado = 0;
var numeroProcessos;
var duracaoProcesso = 0;
var tempoProcesso = 0;
var prioridadeProcesso = 0;
var quantum = 0;
var codigo;
var tempoAtual = 0;
var canvas;
var ctx;


/*var BlocoDescritorDeProcesso = function (codigo, instanteIngresso, prioridade, duracaoTotal) {
    this.codigo = codigo
    this.instanteIngresso = instanteIngresso
    this.prioridade = prioridade
    this.duracaoTotal = duracaoTotal
    this.concluido = false
};

processos[0].codigo;
*/

var ObjetoProcesso = function (duracaoProcesso, tempoProcesso, prioridadeProcesso) {
    this.id = 0
    this.duracaoProcesso = duracaoProcesso
    this.tempoProcesso = tempoProcesso
    this.prioridadeProcesso = prioridadeProcesso
    this.concluido = false
}

var processos = [];

function algoritmo() {
    let selecao = document.getElementById('select');
    let valor = selecao.options[select.selectedIndex].value;
    if (valor == "fifo") {
        window.location.href = "fifo/fifo.html";
    } else if (valor == "round_robin") {
        window.location.href = "round_robin/round_robin.html";
    } else if (valor == "sjf") {
        window.location.href = "sjf/sjf.html";
    } else {
        window.location.href = "prioridades/prioridades.html";
    }
}

function btn_bora_ff() {
    codigo = "fifo";
    if (verificaEstado == 0) {
        addCamposDuracao();
    } else if (verificaEstado == 1) {
        salvaDadosDuracao();
    } else if (verificaEstado == 2) {
        salvaDadosTempo();
    }
}

function btn_bora_rr() {
    codigo = "round_robin";
    if (verificaEstado == 0) {
        quantum = document.getElementById("quantum").value;
        addCamposDuracao();
    } else if (verificaEstado == 1) {
        salvaDadosDuracao();
    } else if (verificaEstado == 2) {
        salvaDadosTempo();
    }
}

function btn_bora_sjf() {
    codigo = "sjf";
    if (verificaEstado == 0) {
        addCamposDuracao();
    } else if (verificaEstado == 1) {
        salvaDadosDuracao();
    } else if (verificaEstado == 2) {
        salvaDadosTempo();
    }
}

function btn_bora_prioridades() {
    codigo = "prioridades";
    if (verificaEstado == 0) {
        addCamposDuracao();
    } else if (verificaEstado == 1) {
        salvaDadosDuracao();
    } else if (verificaEstado == 2) {
        salvaDadosTempo();
    } else if (verificaEstado == 3) {
        salvaDadosPrioridade();
    }
}

function salvaDadosDuracao(){
    let somaDuracao = 0;
    for (let i = 0; i < numeroProcessos; i++) {
        processos[i].duracaoProcesso = parseInt(document.getElementById("duracaoProcesso" + i).value);
        somaDuracao += parseInt(processos[i].duracaoProcesso);
    }
    if (somaDuracao <= 80) {
        addCamposTempo();
    } else {
        alert("A soma dos valores não pode ser maior que 80");
        somaDuracao = 0;
    }
}

function salvaDadosTempo(){
    //tempoProcesso = [numeroProcessos];
    let flag = 0;
    for (let i = 0; i < numeroProcessos; i++) {
        processos[i].tempoProcesso = parseInt(document.getElementById("tempoProcesso" + i).value);
        processos[i].id = i;
        if (parseInt(processos[i].tempoProcesso) > 80) {
            flag = 1;
        }
    }
    if (flag == 0) {
        if (codigo == "prioridades") {
            addCamposPrioridade();
        } else {
            alteraLayout();
        }
    } else {
        alert("Nenhum tempo não pode ser maior que 80");
    }
}

function salvaDadosPrioridade(){
    //prioridadeProcesso = [numeroProcessos];
    for (let i = 0; i < numeroProcessos; i++) {
        processos[i].prioridadeProcesso = parseInt(document.getElementById("prioridadeProcesso" + i).value);
    }
    alteraLayout();
}

function addCamposDuracao(){
    // Numero de inputs a ser criado
    numeroProcessos = document.getElementById("processos").value;
    let container = document.getElementById("container");
    if (numeroProcessos >= 1 & numeroProcessos <= 10 ) {
        while (container.hasChildNodes()) {
            container.removeChild(container.lastChild);
        }
        // Limpa os antigos conteúdos do container
        for (let i=0; i<numeroProcessos; i++){
            // Cria um elemento <input>, define os atributos type, id, min e placeholder
            let input = document.createElement("input");
            input.type = "number";
            input.id = "duracaoProcesso" + i;
            input.min = 1;
            input.placeholder = "Duração do processo " + (i + 1);
            container.appendChild(input);
            processos.push(new ObjetoProcesso());
        }
        verificaEstado = 1;
    } else {
        alert("O valor não pode ser menor que 1 ou maior que 10");
    }
}

function addCamposTempo(){
    let container = document.getElementById("container");
    while (container.hasChildNodes()) {
        container.removeChild(container.lastChild);
    }
    for (let i=0;i<numeroProcessos;i++){
        let input = document.createElement("input");
        input.type = "number";
        input.id = "tempoProcesso" + i;
        input.min = 1;
        input.placeholder = "Tempo do processo " + (i + 1);
        container.appendChild(input);
    }    
    verificaEstado = 2;
}

function addCamposPrioridade(){
    let container = document.getElementById("container");
    while (container.hasChildNodes()) {
        container.removeChild(container.lastChild);
    }
    for (let i=0;i<numeroProcessos;i++){
        let input = document.createElement("input");
        input.type = "number";
        input.id = "prioridadeProcesso" + i;
        input.min = 1;
        input.placeholder = "Prioridade do processo " + (i + 1);
        container.appendChild(input);
    }    
    verificaEstado = 3;
}

function alteraLayout() {
    let container = document.getElementById("apaga");
    while (container.hasChildNodes()) {
        container.removeChild(container.lastChild);
    }
    document.getElementById("fundo1").id = "tela_topo_grafico";
    document.getElementById("posição_imagem").id = "posição_logo_grafico";
    document.getElementById("posição_texto2").id = "tela_meio_grafico";
    document.getElementById("apaga").id = "grafico";
    container = document.getElementById("grafico");
    document.getElementById("link").id = "link_img";
    let graph = document.createElement("canvas");
    graph.id = "meuCanvas";
    graph.width = 1090;
    graph.height = 250;
    container.appendChild(graph);
    let img = document.createElement("img");
    img.src = "../img/regua.png";
    img.id = "regua";
    container.appendChild(img);
    canvas = document.getElementById('meuCanvas');
    ctx = canvas.getContext('2d');
    console.log(processos);
    defineCodigo();
}

function defineCodigo() {
    //console.log(codigo);
    if (codigo == "fifo") {
        fifo();
    } else if (codigo == "round_robin") {
        roundRobin();
    } else if (codigo == "sjf") {
        sjf();
    } else if (codigo == "prioridades") {
        prioridades();
    }
}

function ordenaProcessosAptos(processosAptos) {
    if (codigo == "sjf") {
        for (index = processosAptos.length-1; index >= 0; --index) {
            if (index > 0){
                if (processosAptos[index].duracaoProcesso < processosAptos[index-1].duracaoProcesso){
                    auxiliar = processosAptos[index];
                    processosAptos[index] = processosAptos[index-1];
                    processosAptos[index-1] = auxiliar;
                }
            }
        }
    } else if (codigo == "prioridades") {
        for (index = processosAptos.length-1; index >= 0; --index) {
            if (index > 0){
                if (processosAptos[index].prioridadeProcesso > processosAptos[index-1].prioridadeProcesso){
                    auxiliar = processosAptos[index];
                    processosAptos[index] = processosAptos[index-1];
                    processosAptos[index-1] = auxiliar;
                }
            }
        }
    }    
    return processosAptos;
}

function fifo() {
    console.log(processos);
    var processosAptos = [];
    var processoNoProcessador = null;
    for (let index = 0; index <= 80; index++) {        
        processos.forEach(element => {
            if (element.tempoProcesso == tempoAtual ){
                processosAptos.push(element);
            }
        })

        if ((processoNoProcessador == null) && (processosAptos.length > 0)){
            processoNoProcessador = processosAptos[0];
            console.log("Fila: ", processosAptos);
            processosAptos.shift();
        }

        if (processoNoProcessador != null){
            geraGrafico(processoNoProcessador);
        } else {
            geraGrafico(-10);
        }

        if (processoNoProcessador != null) {
            processoNoProcessador.duracaoProcesso--;
            if (processoNoProcessador.duracaoProcesso == 0) {
                processos.forEach(element => {
                    if (element.id == processoNoProcessador.id) {
                        element.concluido = true;
                    }
                });
                processoNoProcessador = null;
            }
        }
        tempoAtual++;
    }
}

function roundRobin() {
    let contador = 0;
    console.log(processos);
    var processosAptos = [];
    var processoNoProcessador = null;
    for (let index = 0; index <= 80; index++) {        
        processos.forEach(element => {
            if (element.tempoProcesso == tempoAtual ){
                processosAptos.push(element);
            }
        })

        if ((processoNoProcessador == null) && (processosAptos.length > 0)){
            processoNoProcessador = processosAptos[0];
            console.log("Fila: ", processosAptos);
            processosAptos.shift();
        }

        if (processoNoProcessador == null){
            geraGrafico(-10);
        } else {
            geraGrafico(processoNoProcessador);
        }

        if (processoNoProcessador != null) {
            contador++;
            processoNoProcessador.duracaoProcesso--;
            if (processoNoProcessador.duracaoProcesso == 0) {
                processos.forEach(element => {
                    if (element.id == processoNoProcessador.id) {
                        element.concluido = true;
                    }
                });
                contador = 0;
                processoNoProcessador = null;
            }
            if (contador == quantum) {
                processosAptos.push(processoNoProcessador);
                contador = 0;
				processoNoProcessador = null;
            }
        }
        tempoAtual++;
    }
}

function sjf() {
    console.log(processos);
    var processosAptos = [];
    var processoNoProcessador = null;
    for (let index = 0; index <= 80; index++) {        
        processos.forEach(element => {
            if (element.tempoProcesso == tempoAtual ){
                processosAptos.push(element);
                if (processosAptos.length > 1) {
                    processosAptos = ordenaProcessosAptos(processosAptos);
                }
            }
        });

        if ((processoNoProcessador == null) && (processosAptos.length > 0)){
            processoNoProcessador = processosAptos[0];
            console.log("Fila: ", processosAptos);
            processosAptos.shift();
        }

        if (processoNoProcessador == null){
            geraGrafico(-10);
        } else {
            geraGrafico(processoNoProcessador);
        }

        if (processoNoProcessador != null) {
            processoNoProcessador.duracaoProcesso--;
            if (processoNoProcessador.duracaoProcesso == 0) {
                processos.forEach(element => {
                    if (element.id == processoNoProcessador.id) {
                        element.concluido = true;
                    }
                });
                processoNoProcessador = null;
            }
        }
        tempoAtual++;
    }
}

function prioridades() {
    console.log(processos);
    var processosAptos = [];
    var processoNoProcessador = null;
    for (let index = 0; index <= 80; index++) {        
        processos.forEach(element => {
            if (element.tempoProcesso == tempoAtual ){
                processosAptos.push(element);
                if (processosAptos.length > 1) {
                    processosAptos = ordenaProcessosAptos(processosAptos);
                }
            }
        });

        if ((processosAptos.length > 0) && (processoNoProcessador != null)) {
            if (processoNoProcessador.prioridadeProcesso < processosAptos[0].prioridadeProcesso){
                processosAptos.push(processoNoProcessador);
                processoNoProcessador = null;
                if (processosAptos.length > 1) {
                    processosAptos = ordenaProcessosAptos(processosAptos);
                }
            }
        }

        if ((processoNoProcessador == null) && (processosAptos.length > 0)){
            processoNoProcessador = processosAptos[0];
            console.log("Fila: ", processosAptos);
            processosAptos.shift();
        }

        if (processoNoProcessador == null){
            geraGrafico(-10);
        } else {
            geraGrafico(processoNoProcessador);
        }

        if (processoNoProcessador != null) {
            processoNoProcessador.duracaoProcesso--;
            if (processoNoProcessador.duracaoProcesso == 0) {
                processos.forEach(element => {
                    if (element.id == processoNoProcessador.id) {
                        element.concluido = true;
                    }
                });
                processoNoProcessador = null;
            }
        }
        tempoAtual++;
    }
}

function geraGrafico(processoAtual) {
    processos.forEach(element => {
        if (element.id == processoAtual.id) {
            ctx.fillStyle = corProcessando;
        } else if (tempoAtual >= element.tempoProcesso && !element.concluido) {
            ctx.fillStyle = corEsperando;
        } else {
            ctx.fillStyle = corSemAtividade; // ou não existente
        }
        ctx.fillRect(13.45*tempoAtual, (13.45*element.id)+(4*element.id), 13.45, 13.45);
    });
}
