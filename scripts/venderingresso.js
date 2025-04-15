function adicionarDado(chave, dado) {
    const dados = JSON.parse(localStorage.getItem(chave) || "[]");
    dados.push(dado);
    localStorage.setItem(chave, JSON.stringify(dados));
}
  
function pegarDados(chave) {
    return JSON.parse(localStorage.getItem(chave) || "[]");
}

document.getElementById("form-venda").addEventListener("submit", function(e) {
    
    e.preventDefault();

    const ingresso = {
        sessao: document.getElementById("sessao").value,
        nome_cliente: document.getElementById("nome-cliente").value,
        cpf: document.getElementById("cpf").value,
        assento: document.getElementById("assento-nome").value,
        tipoPagamento: document.getElementById("tipo-pagamento").value
    };

    const ingressos = pegarDados("ingressos");

    if (indiceEditando !== null) {
        ingressos[indiceEditando] = ingresso; 
        indiceEditando = null;
        localStorage.setItem("ingressos", JSON.stringify(ingressos));

    } else {
        adicionarDado("ingressos", ingresso);
    }
    if (localStorage.getItem("sessaoSelecionada")) {localStorage.removeItem("sessaoSelecionada");}
    alert("Ingresso Salvo.");
    document.getElementById("form-venda").reset();
    ListarIngressos();
});

function VenderIngresso() {
    let sessoes = pegarDados("sessoes");
    const filmes = pegarDados("filmes");
  
    const select = document.getElementById("sessao");

    const ingresso = localStorage.getItem("sessaoSelecionada");

    if (select) {
        select.innerHTML = "";
    
        if (ingresso){

            const sessao_index = JSON.parse(ingresso);

            let s = sessoes[sessao_index];

            const opt = new Option(`${filmes[s.filmeIndex].titulo} - ${s.data_hora.replace("T", " ")}`, sessao_index, true);
            select.appendChild(opt);

        }
        else{
            sessoes.forEach((s, i) => {
                const opt = new Option(`${filmes[s.filmeIndex].titulo} - ${s.data_hora.replace("T", " ")}`, i);
                select.appendChild(opt);
            });
        }
    }
}

let indiceEditando = null;

function editarIngresso(index) {
    const ingressos = pegarDados("ingressos");
    const ingresso = ingressos[index];
    indiceEditando = index;

    const select = document.getElementById("sessao");

    const sessoes = pegarDados("sessoes");

    const filmes = pegarDados("filmes");

    select.innerHTML = "";

    sessoes.forEach((s, i) => {

        let opt;
        if (i == ingresso.sessao){
            opt = new Option(`${filmes[s.filmeIndex].titulo} - ${s.data_hora.replace("T", " ")}`, i, true, true);
        }
        else{
            opt = new Option(`${filmes[s.filmeIndex].titulo} - ${s.data_hora.replace("T", " ")}`, i);
        }
        select.appendChild(opt);
    });

    document.getElementById("nome-cliente").value = ingresso.nome_cliente;
    document.getElementById("cpf").value = ingresso.cpf;
    document.getElementById("assento-nome").value = ingresso.assento;
    document.getElementById("tipo-pagamento").value = ingresso.tipoPagamento;
}

function excluirIngresso(index) {
    const ingressos = pegarDados("ingressos");
    if (confirm("Deseja realmente excluir este ingresso?")) {
        ingressos.splice(index, 1);
        localStorage.setItem("ingressos", JSON.stringify(ingressos));
        ListarIngressos();
    }
}

function ListarIngressos(){
    const ingressos = pegarDados("ingressos");
    const sessoes = pegarDados("sessoes");
    const filmes = pegarDados("filmes")
    const tbody = document.querySelector("tbody");

    if (tbody) {
        tbody.innerHTML = "";
        ingressos.forEach((i, index) => {
            const linha = document.createElement("tr");
            linha.innerHTML = `
                <td>${filmes[sessoes[i.sessao].filmeIndex].titulo}</td>
                <td>${i.nome_cliente}</td>
                <td>${i.cpf}</td>
                <td>${i.assento}</td>
                <td>${i.tipoPagamento}</td>
                <td>
                    <button class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#modalVenda" onclick="editarIngresso(${index})">Editar</button>
                    <button class="btn btn-danger btn-sm ms-1" onclick="excluirIngresso(${index})">Excluir</button>
                </td>
            `;
            tbody.appendChild(linha);
        });
    }
}

ListarIngressos();
