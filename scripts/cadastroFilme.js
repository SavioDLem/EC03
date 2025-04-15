function adicionarDado(chave, dado) {
    const dados = JSON.parse(localStorage.getItem(chave) || "[]");
    dados.push(dado);
    localStorage.setItem(chave, JSON.stringify(dados));
}
  
function pegarDados(chave) {
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

    const filmes = pegarDados("filmes")

    if (indiceEditando !== null) {
        filmes[indiceEditando] = filme; 
        indiceEditando = null;
        localStorage.setItem("filmes", JSON.stringify(filmes));
    } 
    else{
        adicionarDado("filmes", filme);
    }
    alert("Filme salvo.")
    document.getElementById("form-filme").reset();
    ListarFilmes();
  });

function ListarFilmes() {
    const filmes = pegarDados("filmes");
    const tbody = document.querySelector("tbody");
  
    if (tbody) {
        tbody.innerHTML = ""
        filmes.forEach((f, index) => {
            const linha = document.createElement("tr");
            linha.innerHTML = `
            <td>${f.titulo}</td>
            <td>${f.descricao}</td>
            <td>${f.genero}</td>
            <td>${f.classificacao}</td>
            <td>${f.duracao}</td>
            <td>${f.estreia}</td>
            <td>
                <button class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#modalCadastroFilme" onclick="editarFilme(${index})">Editar</button>
                <button class="btn btn-danger btn-sm ms-1" onclick="excluirFilme(${index})">Excluir</button>
            </td>
            `;
            tbody.appendChild(linha);
        });
    }
}

let indiceEditando = null;

function editarFilme(index) {
    const filmes = pegarDados("filmes");
    const filme = filmes[index];
    indiceEditando = index;

    document.getElementById("titulo").value = filme.titulo;
    document.getElementById("descricao").value = filme.descricao;
    document.getElementById("genero").value = filme.genero;
    document.getElementById("classificacao").value = filme.classificacao;
    document.getElementById("duracao").value = filme.duracao;
    document.getElementById("estreia").value = filme.estreia;
}

function excluirFilme(index) {
    const filmes = pegarDados("filmes");
    if (confirm("Deseja realmente excluir este filme?")) {
        filmes.splice(index, 1);
        localStorage.setItem("filmes", JSON.stringify(filmes));
        ListarFilmes();
    }
}


window.onload = function (){

    ListarFilmes();
}
