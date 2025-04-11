function salvarDado(chave, dado) {
    const dados = JSON.parse(localStorage.getItem(chave) || "[]");
    dados.push(dado);
    localStorage.setItem(chave, JSON.stringify(dados));
}
  
function carregarDado(chave) {
    return JSON.parse(localStorage.getItem(chave) || "[]");
}

document.getElementById("form-venda").addEventListener("submit", function(e) {
    
    e.preventDefault();

    console.log("Teste");
    const ingresso = {
        sessao: document.getElementById("sessao").value, 
        nome_cliente: document.getElementById("nome-cliente").value,
        cpf: document.getElementById("cpf").value,
        assento: document.getElementById("assento-nome").value,
        tipoPagamento: document.getElementById("tipo-pagamento").value
    };
    salvarDado("ingressos", ingresso);
    document.getElementById("form-venda").reset();
    ListarIngressos();
});

function VenderIngresso() {
    let sessoes = carregarDado("sessoes");
    const filmes = carregarDado("filmes");
  
    const select = document.getElementById("sessao");

    const sessao = JSON.parse(localStorage.getItem("sessaoSelecionada"));
    if (select) {
        select.innerHTML = "";
        
        if (sessao){

            sessoes = [sessoes[sessao]]

            localStorage.removeItem("sessaoSelecionada")

        }

        sessoes.forEach((s, i) => {
            const opt = new Option(`${filmes[s.filmeIndex]?.titulo} - ${s.data} ${s.horario}`, i);
            select.appendChild(opt);
        });
    }
}

function ListarIngressos(){
    const sessoes = carregarDado("sessoes");
    const filmes = carregarDado("filmes");
    const ingressos = carregarDado("ingressos")
    const tbody = document.querySelector("tbody");

    if (tbody) {
        tbody.innerHTML = ""
      ingressos.forEach(i => {
        const linha = document.createElement("tr");
        linha.innerHTML = `
          <td>${filmes[sessoes[i.sessao].filmeIndex].titulo}</td>
          <td>${i.nome_cliente}</td>
          <td>${i.cpf}</td>
          <td>${i.assento}</td>
          <td>${i.tipoPagamento}</td>
        `;
        tbody.appendChild(linha);
      });
    }
}

ListarIngressos();

window.onclick = function () {

    VenderIngresso();
}
