function salvarDado(chave, dado) {
    const dados = JSON.parse(localStorage.getItem(chave) || "[]");
    dados.push(dado);
    localStorage.setItem(chave, JSON.stringify(dados));
}

function carregarDado(chave) {
    return JSON.parse(localStorage.getItem(chave) || "[]");
}


function ListarSessoes() {
    const filmes = carregarDado("filmes");
    const salas = carregarDado("salas");
    const sessoes = carregarDado("sessoes");
    const tbody = document.querySelector("tbody");
  
    if (tbody) {
        tbody.innerHTML = ""
        sessoes.forEach((s, index) => {
        const linha = document.createElement("tr");
        linha.innerHTML = `
            <td>${filmes[s.filmeIndex].titulo}</td>
            <td>${salas[s.salaIndex].nome}</td>
            <td>${s.data_hora.replace("T", " ")}</td>
            <td>R$${s.preco}</td>
            <td><button class="btn btn-primary" onclick="selecionarSessao(${index})">Comprar Ingresso</button></td>
        `;
        tbody.appendChild(linha);
      });
    }
}

function selecionarSessao(index) {
    localStorage.setItem("sessaoSelecionada", index);
    window.location.href = "../html/venda-ingressos.html";
}

window.onload = function (){
    ListarSessoes();
}
