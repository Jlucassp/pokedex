const pokemons = [
    {
        nome: "Bulbasaur",
        id: 1,
        cp: 798,
        tipos: ["Planta", "Veneno"],
        hp: 45,
        ataque: 65,
        classes: ["planta", "veneno"]
    },
    {
        nome: "Charmander",
        id: 4,
        cp: 1500,
        tipos: ["Fogo"],
        hp: 60,
        ataque: 95,
        classes: ["fogo"]
    },
    {
        nome: "Squirtle",
        id: 7,
        cp: 1245,
        tipos: ["Água"],
        hp: 100,
        ataque: 40,
        classes: ["agua"]
    }
];

const container = document.getElementById('pokedex-lista');

function renderizarPokemons() {
    const container = document.getElementById('pokedex-lista');
    if (!container) return;

    container.innerHTML = pokemons.map(poke => `
        <div class="cartao">
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

            <button class="btn-treinar" onclick="treinar(this, '${poke.nome}')">Testar Performance</button>
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

document.addEventListener('DOMContentLoaded', renderizarPokemons);

function configurarReset() {
    const btnReset = document.getElementById('btn-reset');

    if (!btnReset) return;

    btnReset.addEventListener('click', () => {
        const todosOsBotoes = document.querySelectorAll('.btn-treinar');

        todosOsBotoes.forEach(botao => {
            botao.style.backgroundColor = "";
            botao.innerText = "Testar Performance";
        });

        alert('Todos os treinamentos foram resetados!');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderizarPokemons();
    configurarReset();
});

function configurarBusca() {
    const campo = document.getElementById('campo-busca');
    if (!campo) return;

    campo.addEventListener('input', (evento) => {
        const termoBusca = evento.target.value.toLowerCase();

        const pokemonsFiltrados = pokemons.filter(poke =>
            poke.nome.toLowerCase().includes(termoBusca)
        );

        renderizarPokemons(pokemonsFiltrados);
    });
}

function renderizarPokemons(listaParaExibir = pokemons) {
    const container = document.getElementById('pokedex-lista');
    if (!container) return;

    container.innerHTML = listaParaExibir.map(poke => `
        `).join('');
}