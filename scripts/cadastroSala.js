function adicionarDado(chave, dado) {
    const dados = JSON.parse(localStorage.getItem(chave) || "[]");
    dados.push(dado);
    localStorage.setItem(chave, JSON.stringify(dados));
}
  
function pegarDados(chave) {
    return JSON.parse(localStorage.getItem(chave) || "[]");
}

let indiceEditando = null;

document.getElementById("form-sala").addEventListener("submit", function (event){
    event.preventDefault();
    const sala = {
        nome: document.getElementById("nomeSala").value,
        capacidade: document.getElementById("capacidade").value
    };
    const salas = pegarDados("sala")

    if (indiceEditando !== null) {
        salas[indiceEditando] = sala; 
        indiceEditando = null;
        localStorage.setItem("salas", JSON.stringify(salas));
    } 
    else{
        adicionarDado("salas", sala)
    }
    alert("Sala salva.");
    document.getElementById("form-sala").reset();
    ListarSalas();
});

function editarSala(index) {
    const salas = pegarDados("salas");
    const sala = salas[index];
    indiceEditando = index;

    document.getElementById("nomeSala").value = sala.nome;
    document.getElementById("capacidade").value = sala.capacidade;
    
}

function excluirSala(index) {
    const salas = pegarDados("salas");
    if (confirm("Deseja realmente excluir esta sala?")) {
        salas.splice(index, 1);
        localStorage.setItem("salas", JSON.stringify(salas));
        ListarSalas();
    }
}

function ListarSalas() {
    const salas = pegarDados("salas");
    const tbody = document.querySelector("tbody");
  
    if (tbody) {
        tbody.innerHTML = ""
        salas.forEach((s, index) => {
            const linha = document.createElement("tr");
            linha.innerHTML = `
                <td>${s.nome}</td>
                <td>${s.capacidade}
                <td>
                    <button class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#modalSala" onclick="editarSala(${index})">Editar</button>
                    <button class="btn btn-danger btn-sm ms-1" onclick="excluirSala(${index})">Excluir</button>
                </td>
            `;
            tbody.appendChild(linha);
      });
    }
}


window.onload = function () {
    ListarSalas();
}

