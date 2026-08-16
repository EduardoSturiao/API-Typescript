// ============================================================
// Camada visual apenas. Os dados abaixo são de exemplo e ficam
// só na memória do navegador — trocar pelas chamadas da API
// nos pontos marcados com "API:".
// ============================================================

const clientes = [
    { id: "1", nome: "Eduardo Sturiao", email: "eduardo@email.com" },
    { id: "2", nome: "Cliente Exemplo", email: "cliente@email.com" },
];

const usuarios = [
    { id: "1", nome: "Admin", email: "admin@email.com" },
];

const vendas = [
    { id: "1", mes: 1, valorVendido: 1500, cliente: "1" },
];

const listas = { cliente: clientes, usuario: usuarios, venda: vendas };

// id do item sendo editado em cada seção (null = criando um novo)
const emEdicao = { cliente: null, usuario: null, venda: null };

// texto digitado em cada campo de busca
const busca = { cliente: "", usuario: "", venda: "" };

const MESES = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

const TITULOS = {
    cliente: { novo: "Novo cliente", editar: "Editar cliente" },
    usuario: { novo: "Novo usuario", editar: "Editar usuario" },
    venda: { novo: "Nova venda", editar: "Editar venda" },
};

const FORMULARIOS = {
    cliente: document.querySelector("#formCliente"),
    usuario: document.querySelector("#formUsuario"),
    venda: document.querySelector("#formVenda"),
};

const ICONE_LAPIS = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 20h9"/>
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
    </svg>`;

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

// ---------- HELPERS ----------

function acoes(tipo, id) {
    return `
        <div class="acoes">
            <button class="botao-icone" data-editar data-tipo="${tipo}" data-id="${id}" aria-label="Editar">${ICONE_LAPIS}</button>
            <button class="botao-icone botao-excluir" data-excluir data-tipo="${tipo}" data-id="${id}" aria-label="Excluir">${ICONE_LIXEIRA}</button>
        </div>`;
}

function linhaVazia(colunas, texto) {
    return `<tr><td colspan="${colunas}" class="vazio">${texto}</td></tr>`;
}

function classeLinha(tipo, id) {
    return emEdicao[tipo] === id ? ' class="em-edicao"' : "";
}

function moeda(valor) {
    return valor.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
}

function contem(texto, termo) {
    return String(texto).toLowerCase().includes(termo.toLowerCase());
}

// ---------- RENDERIZAÇÃO DAS TABELAS ----------

function renderizarClientes() {
    // API: para buscar no servidor, trocar por GET /clientes?nome=<busca.cliente>
    const filtrados = clientes.filter((cliente) =>
        contem(cliente.nome, busca.cliente) || contem(cliente.email, busca.cliente));

    document.querySelector("#tabelaClientes").innerHTML = filtrados.length === 0
        ? linhaVazia(3, busca.cliente ? "Nenhum cliente encontrado." : "Nenhum cliente cadastrado.")
        : filtrados.map((cliente) => `
            <tr${classeLinha("cliente", cliente.id)}>
                <td>${cliente.nome}</td>
                <td>${cliente.email}</td>
                <td>${acoes("cliente", cliente.id)}</td>
            </tr>`).join("");

    renderizarSelectClientes();
}

function renderizarUsuarios() {
    // API: para buscar no servidor, trocar por GET /usuarios?nome=<busca.usuario>
    const filtrados = usuarios.filter((usuario) =>
        contem(usuario.nome, busca.usuario) || contem(usuario.email, busca.usuario));

    document.querySelector("#tabelaUsuarios").innerHTML = filtrados.length === 0
        ? linhaVazia(3, busca.usuario ? "Nenhum usuario encontrado." : "Nenhum usuario cadastrado.")
        : filtrados.map((usuario) => `
            <tr${classeLinha("usuario", usuario.id)}>
                <td>${usuario.nome}</td>
                <td>${usuario.email}</td>
                <td>${acoes("usuario", usuario.id)}</td>
            </tr>`).join("");
}

function renderizarVendas() {
    const nomeCliente = (id) => {
        const cliente = clientes.find((item) => item.id === id);
        return cliente ? cliente.nome : "-";
    };

    // API: para buscar no servidor, trocar por GET /vendas?cliente=<busca.venda>
    const filtradas = vendas.filter((venda) =>
        contem(MESES[venda.mes - 1], busca.venda) || contem(nomeCliente(venda.cliente), busca.venda));

    document.querySelector("#tabelaVendas").innerHTML = filtradas.length === 0
        ? linhaVazia(4, busca.venda ? "Nenhuma venda encontrada." : "Nenhuma venda cadastrada.")
        : filtradas.map((venda) => `
            <tr${classeLinha("venda", venda.id)}>
                <td>${MESES[venda.mes - 1]}</td>
                <td>${moeda(venda.valorVendido)}</td>
                <td>${nomeCliente(venda.cliente)}</td>
                <td>${acoes("venda", venda.id)}</td>
            </tr>`).join("");
}

function renderizarSelectClientes() {
    const select = document.querySelector("#selectCliente");
    const selecionado = select.value;

    select.innerHTML = `<option value="" disabled ${selecionado ? "" : "selected"}>Cliente</option>`
        + clientes.map((cliente) =>
            `<option value="${cliente.id}" ${cliente.id === selecionado ? "selected" : ""}>${cliente.nome}</option>`).join("");
}

function renderizarTudo() {
    renderizarClientes();
    renderizarUsuarios();
    renderizarVendas();
}

// ---------- BUSCA ----------

document.querySelectorAll("[data-busca]").forEach((campo) => {
    campo.addEventListener("input", () => {
        busca[campo.dataset.busca] = campo.value.trim();
        renderizarTudo();
    });
});

// ---------- MODO DE EDIÇÃO ----------

function abrirEdicao(tipo, id) {
    const item = listas[tipo].find((registro) => registro.id === id);
    const form = FORMULARIOS[tipo];

    // API: se preferir buscar o registro atualizado, GET /<recurso>/:id antes de preencher
    Object.entries(item).forEach(([chave, valor]) => {
        const campo = form.elements[chave];
        if (campo) campo.value = valor;
    });

    emEdicao[tipo] = id;
    form.classList.add("editando");
    form.closest(".card").querySelector("[data-titulo-form]").textContent = TITULOS[tipo].editar;
    form.querySelector("[data-rotulo-botao]").textContent = "Salvar";

    // senha não volta da API — em edição ela deixa de ser obrigatória
    if (form.elements.senha) {
        form.elements.senha.value = "";
        form.elements.senha.required = false;
        form.elements.senha.placeholder = "Nova senha (opcional)";
    }

    form.elements[0].focus();
    renderizarTudo();
}

function cancelarEdicao(tipo) {
    const form = FORMULARIOS[tipo];

    emEdicao[tipo] = null;
    form.reset();
    form.classList.remove("editando");
    form.closest(".card").querySelector("[data-titulo-form]").textContent = TITULOS[tipo].novo;
    form.querySelector("[data-rotulo-botao]").textContent = "Criar";

    if (form.elements.senha) {
        form.elements.senha.required = true;
        form.elements.senha.placeholder = "Senha";
    }

    renderizarTudo();
}

document.querySelectorAll("[data-cancelar]").forEach((botao) => {
    botao.addEventListener("click", () => cancelarEdicao(botao.closest("form").dataset.tipo));
});

// ---------- CRIAR / ATUALIZAR ----------

function dadosDoForm(form) {
    const dados = Object.fromEntries(new FormData(form));

    if (form.dataset.tipo === "venda") {
        dados.mes = Number(dados.mes);
        dados.valorVendido = Number(dados.valorVendido);
    }

    return dados;
}

// a senha vai no corpo da requisição, mas não fica guardada na lista da tela
function semSenha({ senha, ...resto }) {
    return resto;
}

function novoId() {
    return String(Date.now()) + Math.random().toString(16).slice(2, 6);
}

Object.entries(FORMULARIOS).forEach(([tipo, form]) => {
    form.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const dados = dadosDoForm(form);
        const lista = listas[tipo];

        if (emEdicao[tipo]) {
            // API: PUT /<recurso>/:id com "dados" no corpo
            const indice = lista.findIndex((item) => item.id === emEdicao[tipo]);
            lista[indice] = { ...lista[indice], ...semSenha(dados) };
            cancelarEdicao(tipo);
            return;
        }

        // API: POST /<recurso> com "dados" no corpo
        lista.push({ id: novoId(), ...semSenha(dados) });

        form.reset();
        renderizarTudo();
    });
});

// ---------- AÇÕES DA TABELA ----------

document.addEventListener("click", (evento) => {
    const editar = evento.target.closest("[data-editar]");
    if (editar) {
        abrirEdicao(editar.dataset.tipo, editar.dataset.id);
        return;
    }

    const excluir = evento.target.closest("[data-excluir]");
    if (!excluir) return;

    const { tipo, id } = excluir.dataset;

    // API: DELETE /<recurso>/:id
    const lista = listas[tipo];
    lista.splice(lista.findIndex((item) => item.id === id), 1);

    if (emEdicao[tipo] === id) cancelarEdicao(tipo);
    renderizarTudo();
});

// ---------- INICIALIZAÇÃO ----------

renderizarTudo();
