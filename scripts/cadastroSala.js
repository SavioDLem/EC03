function salvarDado(chave, dado) {
    const dados = JSON.parse(localStorage.getItem(chave) || "[]");
    dados.push(dado);
    localStorage.setItem(chave, JSON.stringify(dados));
}
  
function carregarDado(chave) {
    return JSON.parse(localStorage.getItem(chave) || "[]");
}

document.getElementById("form-sala").addEventListener("submit", function (event){
    event.preventDefault();
    const sala = {
        nome: document.getElementById("nomeSala").value,
        capacidade: document.getElementById("capacidade").value
    };
    salvarDado("salas", sala);
    alert("Sala salva.");
    document.getElementById("form-sala").reset();
    ListarSalas();
});

function ListarSalas() {
    const salas = carregarDado("salas");
    const tbody = document.querySelector("tbody");
  
    if (tbody) {
        tbody.innerHTML = ""
      salas.forEach(s => {
        const linha = document.createElement("tr");
        linha.innerHTML = `
          <td>${s.nome}</td>
          <td>${s.capacidade}
        `;
        tbody.appendChild(linha);
      });
    }
}


window.onload = function () {
    ListarSalas();
}

