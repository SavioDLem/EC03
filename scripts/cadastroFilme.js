function salvarDado(chave, dado) {
    const dados = JSON.parse(localStorage.getItem(chave) || "[]");
    dados.push(dado);
    localStorage.setItem(chave, JSON.stringify(dados));
}
  
function carregarDado(chave) {
    return JSON.parse(localStorage.getItem(chave) || "[]");
}
  
document.getElementById("form-filme").addEventListener("submit", function (event) {
      event.preventDefault();
      const filme = {
        titulo: document.getElementById("titulo").value,
        descricao: document.getElementById("descricao").value,
        genero: document.getElementById("genero").value,
        classificacao: document.getElementById("classificacao").value,
        duracao: document.getElementById("duracao").value,
        estreia: document.getElementById("estreia").value
      };
      salvarDado("filmes", filme);
      alert("Filme salvo.");
      document.getElementById("form-filme").reset();
      ListarFilmes();
  });

function ListarFilmes() {
    const filmes = carregarDado("filmes");
    const tbody = document.querySelector("tbody");
  
    if (tbody) {
        tbody.innerHTML = ""
      filmes.forEach(f => {
        const linha = document.createElement("tr");
        linha.innerHTML = `
          <td>${f.titulo}</td>
          <td>${f.descricao}</td>
          <td>${f.genero}</td>
          <td>${f.classificacao}</td>
          <td>${f.duracao}</td>
          <td>${f.estreia}</td>
          <td></td>
        `;
        tbody.appendChild(linha);
      });
    }
}


window.onload = function (){

    ListarFilmes();
}
