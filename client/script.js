// TEMPORÁRIO: credenciais fixas só para testar a tela.
// Trocar por uma chamada à API (POST /login) quando a rota existir.
const USUARIO_PADRAO = "admin";
const SENHA_PADRAO = "123";

const formulario = document.querySelector(".formulario");
const erro = document.querySelector("#erro");

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const usuario = document.querySelector("#usuario").value.trim();
    const senha = document.querySelector("#senha").value;

    if (usuario === USUARIO_PADRAO && senha === SENHA_PADRAO) {
        erro.textContent = "";
        window.location.href = "dashboard.html";
    } else {
        erro.textContent = "Usuário ou senha inválidos.";
    }
});
