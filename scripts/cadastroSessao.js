function salvarDado(chave, dado) {
    const dados = JSON.parse(localStorage.getItem(chave) || "[]");
    dados.push(dado);
    localStorage.setItem(chave, JSON.stringify(dados));
}

function carregarDado(chave) {
    return JSON.parse(localStorage.getItem(chave) || "[]");
}


function CadastrarSessao() {
    const filmes = carregarDado("filmes");
    const salas = carregarDado("salas");
  
    const filmeSelect = document.getElementById("filme");
    const salaSelect = document.getElementById("sala");
  
    if (filmeSelect && salaSelect) {
        filmes.forEach((f, i) => {
            if (f && typeof f.titulo === "string" && f.titulo.trim() !== "") {
            let opt = new Option(f.titulo, i);
            filmeSelect.appendChild(opt);
            }
        });
    
        salas.forEach((s, i) => {
            if (s && typeof s.nome === "string" && s.nome.trim() !== "") {
            let opt = new Option(s.nome, i);
            salaSelect.appendChild(opt);
            }
        });
    }
}

document.getElementById("form-sessao").addEventListener("submit", function(event) {
    event.preventDefault();
    const sessao = {
        filmeIndex: document.getElementById("filme").value,
        salaIndex: document.getElementById("sala").value,
        data_hora: document.getElementById("data-hora").value,
        preco: document.getElementById("preço").value,
        idioma: document.getElementById("idioma-sessao").value,
        formato: document.getElementById("formato-sessao").value
    };
    salvarDado("sessoes", sessao);
    alert("Sessão salva.");
    document.getElementById("form-sessao").reset();
});

window.onload = function (){
    CadastrarSessao();
}
