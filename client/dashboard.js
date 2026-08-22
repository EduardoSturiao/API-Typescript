// ============================================================
// Camada visual + integração com a API já existente no projeto.
// Nenhuma rota nova é chamada aqui — só POST/GET/DELETE dos
// endpoints que já existem em src/routes/.
// ============================================================

const API_URL = "http://localhost:3000";

const ROTAS = { cliente: "clientes", usuario: "usuarios", venda: "vendas" };

let clientes = [];
let usuarios = [];
let vendas = [];

const listas = { cliente: clientes, usuario: usuarios, venda: vendas };

// texto digitado em cada campo de filtro (filtro é só na tela)
const busca = { cliente: "", usuario: "", venda: "" };

const MESES = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

const FORMULARIOS = {
    cliente: document.querySelector("#formCliente"),
    usuario: document.querySelector("#formUsuario"),
    venda: document.querySelector("#formVenda"),
};

const ICONE_LIXEIRA = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 6h18"/>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
    </svg>`;

// ---------- NAVEGAÇÃO ENTRE SEÇÕES ----------

document.querySelectorAll(".nav-item").forEach((item) => {
    item.addEventListener("click", () => {
        document.querySelector(".nav-item.ativo").classList.remove("ativo");
        item.classList.add("ativo");

        document.querySelector(".secao.ativa").classList.remove("ativa");
        document.querySelector(`#secao-${item.dataset.secao}`).classList.add("ativa");
    });
});

// ---------- MENU DO CANTO ----------

const menu = document.querySelector("#menu");

document.querySelector("#menuBotao").addEventListener("click", (evento) => {
    evento.stopPropagation();
    menu.classList.toggle("oculto");
});

document.addEventListener("click", () => menu.classList.add("oculto"));

// ---------- MENSAGEM DE STATUS (erro/sucesso das chamadas à API) ----------

const elMensagem = document.querySelector("#mensagem");
let timerMensagem = null;

function mostrarMensagem(texto, tipo = "erro") {
    elMensagem.textContent = texto;
    elMensagem.className = `mensagem ${tipo}`;
    clearTimeout(timerMensagem);
    timerMensagem = setTimeout(() => elMensagem.classList.add("oculto"), 4000);
}

// ---------- CHAMADAS À API ----------

async function api(caminho, opcoes = {}) {
    const controlador = new AbortController();
    const tempoLimite = setTimeout(() => controlador.abort(), 10000);

    let resposta;
    try {
        resposta = await fetch(`${API_URL}${caminho}`, {
            headers: { "Content-Type": "application/json" },
            signal: controlador.signal,
            ...opcoes,
        });
    } catch (erro) {
        throw new Error(erro.name === "AbortError"
            ? "O servidor demorou demais para responder."
            : `Não foi possível conectar à API em ${API_URL}. Ela está rodando (npm run dev)?`);
    } finally {
        clearTimeout(tempoLimite);
    }

    let corpo = null;
    try { corpo = await resposta.json(); } catch { /* resposta sem corpo (ex.: delete) */ }

    if (!resposta.ok) {
        throw new Error(corpo?.mensagem || `Erro ${resposta.status} ao comunicar com a API.`);
    }

    return corpo;
}

async function carregarClientes() {
    const dados = await api("/clientes");
    clientes.length = 0;
    clientes.push(...dados);
}

async function carregarUsuarios() {
    const dados = await api("/usuarios");
    usuarios.length = 0;
    usuarios.push(...dados);
}

async function carregarVendas() {
    const dados = await api("/vendas");
    vendas.length = 0;
    vendas.push(...dados);
}

async function carregarTudo() {
    try {
        await Promise.all([carregarClientes(), carregarUsuarios(), carregarVendas()]);
    } catch (erro) {
        mostrarMensagem(erro.message);
    }
    renderizarTudo();
}

// ---------- HELPERS ----------

function botaoExcluir(tipo, id) {
    return `<button class="botao-excluir" data-excluir data-tipo="${tipo}" data-id="${id}" aria-label="Excluir">${ICONE_LIXEIRA}</button>`;
}

function linhaVazia(colunas, texto) {
    return `<tr><td colspan="${colunas}" class="vazio">${texto}</td></tr>`;
}

function moeda(valor) {
    return valor.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
}

function contem(texto, termo) {
    return String(texto).toLowerCase().includes(termo.toLowerCase());
}

// ---------- RENDERIZAÇÃO DAS TABELAS ----------

function renderizarClientes() {
    const filtrados = clientes.filter((cliente) =>
        contem(cliente.nome, busca.cliente) || contem(cliente.email, busca.cliente));

    document.querySelector("#tabelaClientes").innerHTML = filtrados.length === 0
        ? linhaVazia(3, busca.cliente ? "Nenhum cliente encontrado." : "Nenhum cliente cadastrado.")
        : filtrados.map((cliente) => `
            <tr>
                <td>${cliente.nome}</td>
                <td>${cliente.email}</td>
                <td>${botaoExcluir("cliente", cliente._id)}</td>
            </tr>`).join("");

    renderizarSelectClientes();
}

function renderizarUsuarios() {
    const filtrados = usuarios.filter((usuario) =>
        contem(usuario.nome, busca.usuario) || contem(usuario.email, busca.usuario));

    document.querySelector("#tabelaUsuarios").innerHTML = filtrados.length === 0
        ? linhaVazia(2, busca.usuario ? "Nenhum usuario encontrado." : "Nenhum usuario cadastrado.")
        : filtrados.map((usuario) => `
            <tr>
                <td>${usuario.nome}</td>
                <td>${usuario.email}</td>
            </tr>`).join("");
}

function renderizarVendas() {
    const nomeCliente = (id) => {
        const cliente = clientes.find((item) => item._id === id);
        return cliente ? cliente.nome : "-";
    };

    const filtradas = vendas.filter((venda) =>
        contem(MESES[venda.mes - 1], busca.venda) || contem(nomeCliente(venda.cliente), busca.venda));

    document.querySelector("#tabelaVendas").innerHTML = filtradas.length === 0
        ? linhaVazia(4, busca.venda ? "Nenhuma venda encontrada." : "Nenhuma venda cadastrada.")
        : filtradas.map((venda) => `
            <tr>
                <td>${MESES[venda.mes - 1]}</td>
                <td>${moeda(venda.valorVendido)}</td>
                <td>${nomeCliente(venda.cliente)}</td>
                <td>${botaoExcluir("venda", venda._id)}</td>
            </tr>`).join("");
}

function renderizarSelectClientes() {
    const select = document.querySelector("#selectCliente");
    const selecionado = select.value;

    select.innerHTML = `<option value="" disabled ${selecionado ? "" : "selected"}>Cliente</option>`
        + clientes.map((cliente) =>
            `<option value="${cliente._id}" ${cliente._id === selecionado ? "selected" : ""}>${cliente.nome}</option>`).join("");
}

function renderizarTudo() {
    renderizarClientes();
    renderizarUsuarios();
    renderizarVendas();
}

// ---------- FILTRO DA LISTA (só na tela, sem chamar a API) ----------

document.querySelectorAll("[data-busca]").forEach((campo) => {
    campo.addEventListener("input", () => {
        busca[campo.dataset.busca] = campo.value.trim();
        renderizarTudo();
    });
});

// ---------- CRIAR ----------

function dadosDoForm(form) {
    const dados = Object.fromEntries(new FormData(form));

    if (form.dataset.tipo === "venda") {
        dados.mes = Number(dados.mes);
        dados.valorVendido = Number(dados.valorVendido);
    }

    return dados;
}

Object.entries(FORMULARIOS).forEach(([tipo, form]) => {
    form.addEventListener("submit", async (evento) => {
        evento.preventDefault();

        const dados = dadosDoForm(form);
        const botao = form.querySelector("button[type=submit]");
        botao.disabled = true;

        try {
            await api(`/${ROTAS[tipo]}`, { method: "POST", body: JSON.stringify(dados) });
            form.reset();
            mostrarMensagem("Salvo com sucesso.", "sucesso");
            await carregarTudo();
        } catch (erro) {
            mostrarMensagem(erro.message);
        } finally {
            botao.disabled = false;
        }
    });
});

// ---------- EXCLUIR ----------

document.addEventListener("click", async (evento) => {
    const botao = evento.target.closest("[data-excluir]");
    if (!botao) return;

    const { tipo, id } = botao.dataset;
    botao.disabled = true;

    try {
        await api(`/${ROTAS[tipo]}/${id}`, { method: "DELETE" });
        mostrarMensagem("Removido com sucesso.", "sucesso");
        await carregarTudo();
    } catch (erro) {
        mostrarMensagem(erro.message);
        botao.disabled = false;
    }
});

// ---------- INICIALIZAÇÃO ----------

carregarTudo();
