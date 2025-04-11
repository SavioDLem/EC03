function salvarDado(chave, dado) {
    const dados = JSON.parse(localStorage.getItem(chave) || "[]");
    dados.push(dado);
    localStorage.setItem(chave, JSON.stringify(dados));
}

function carregarDado(chave) {
    return JSON.parse(localStorage.getItem(chave) || "[]");
}


function ListarSessoes() {
    const sessoes = carregarDado("sessoes");
    const filmes = carregarDado("filmes");
    const salas = carregarDado("salas");
    const tbody = document.querySelector("tbody");
  
    if (tbody) {
        tbody.innerHTML = ""
      sessoes.forEach((s, index) => {
        const linha = document.createElement("tr");
        linha.innerHTML = `
            <td>${filmes[s.filmeIndex].titulo}</td>
            <td>${salas[s.salaIndex].nome}</td>
            <td>${s.data}</td>
            <td>${s.horario}</td>
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
