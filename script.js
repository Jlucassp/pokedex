const pokemons = [
    {
        nome: "Bulbasaur",
        id: 1,
        cp: 798,
        tipos: ["Planta", "Veneno"],
        hp: 45,
        ataque: 65,
        classes: ["planta", "veneno"],
        proximaEvolucao: { id: 2, nome: "Ivysaur" }
    },
    {
        nome: "Charmander",
        id: 4,
        cp: 1500,
        tipos: ["Fogo"],
        hp: 60,
        ataque: 95,
        classes: ["fogo"],
        proximaEvolucao: { id: 5, nome: "Charmeleon" }
    },
    {
        nome: "Squirtle",
        id: 7,
        cp: 1245,
        tipos: ["Água"],
        hp: 100,
        ataque: 40,
        classes: ["agua"],
        proximaEvolucao: { id: 8, nome: "Wartortle" }
    }
];

function renderizarPokemons(listaParaExibir = pokemons) {
    const container = document.getElementById('pokedex-lista');
    if (!container) return;

    if (listaParaExibir.length === 0) {
        container.innerHTML = `<p style="color: #666; grid-column: 1/-1;">Nenhum Pokémon encontrado...</p>`;
        return;
    }

    container.innerHTML = listaParaExibir.map(poke => `
        <div class="cartao" onclick="abrirModal(${poke.id})">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.id}.png" alt="${poke.nome}">
            <div class="selo-cp">CP ${poke.cp}</div>
            <h3>${poke.nome}</h3>

            <div class="tipos">
                ${poke.tipos.map((tipo, index) => `<span class="badge ${poke.classes[index]}">${tipo}</span>`).join('')}
            </div>

            <div class="atributos"> <div class="linha-status">
                    <span>HP</span>
                    <div class="barra-fundo"><div class="barra-energia hp" style="width: ${poke.hp}%"></div></div>
                </div>
                <div class="linha-status">
                    <span>Ataque</span>
                    <div class="barra-fundo"><div class="barra-energia ataque" style="width: ${poke.ataque}%"></div></div>
                </div>
            </div>

            <button class="btn-treinar" onclick="event.stopPropagation(); treinar(this, '${poke.nome}')">
                Testar Performance
            </button>
        </div>
    `).join('');
}

function treinar(botao, nome) {
    const seloCP = botao.parentElement.querySelector('.selo-cp');

    let cpAtual = parseInt(seloCP.innerText.replace('CP ', ''));
    seloCP.innerText = `CP ${cpAtual + 10}`;

    alert(`O seu ${nome} subiu de nível e ganhou +10 de CP!`);
    
    botao.style.backgroundColor = "#27ae60";
    botao.innerText = "Treinado!";
}

function configurarBusca() {
    const campo = document.getElementById('campo-busca');
    if (!campo) return;

    campo.addEventListener('input', (evento) => {
        const termoBusca = evento.target.value.toLowerCase();

        const filtrados = pokemons.filter(poke =>
            poke.nome.toLowerCase().includes(termoBusca)
        );

        renderizarPokemons(filtrados);
    });
}   

function configurarReset() {
    const btnReset = document.getElementById('btn-reset');
    if (!btnReset) return;

    btnReset.addEventListener('click', () => {
        const campoBusca = document.getElementById('campo-busca');
        if (campoBusca) campoBusca.value = '';
        renderizarPokemons(pokemons);
    });
}

function abrirModal(id) {
    const poke = pokemons.find(p => p.id === id);
    const modal = document.getElementById('modal');
    const detalhes = document.getElementById('detalhes-pokemon');

    let htmlEvolucao = "";
    if (poke.proximaEvolucao) {
        htmlEvolucao = `
            <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #eee;">
                <p style="font-weight: bold; color: #555;">Próxima Evolução:</p>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.proximaEvolucao.id}.png" width="80">
                <p>${poke.proximaEvolucao.nome}</p>
            </div>
        `;
    } else {
        htmlEvolucao = `<p style="margin-top: 20px; color: #999;"><em>Forma final atingida</em></p>`;
    }

    detalhes.innerHTML = `
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.id}.png" width="180">
        <h2>${poke.nome}</h2>
        <div style="display: flex; justify-content: space-around; margin: 15px 0;">
            <span><strong>HP:</strong> ${poke.hp}</span>
            <span><strong>ATK:</strong> ${poke.ataque}</span>
        </div>
        ${htmlEvolucao}
    `;

    modal.style.display = 'flex';
}

document.getElementById('fechar-modal')?.addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
});

window.onclick = (event) => {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

document.addEventListener('DOMContentLoaded', () => {
    renderizarPokemons();
    configurarBusca();
    configurarReset();
});