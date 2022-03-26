// require("dotenv").config();
const express = require("express");
const { url } = require("inspector");
const path = require("path");
// const expressLayouts = require('express-ejs-layouts');
const app = express();

const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());
// app.use(expressLayouts);

const pokedex = [{
        id: 1,
        nome: "Bulbasaur",
        tipo: "Grass",
        imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
        descricao: "There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.",
        altura: "0.7 m",
        peso: "6.9 kg",
        categoria: "Seed",
        habilidade: "Overgrow"

    },
    {
        id: 2,
        nome: "Ivysaur",
        tipo: "Grass",
        imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/002.png",
        descricao: "When the bulb on its back grows large, it appears to lose the ability to stand on its hind legs.",
        altura: "1.0 m",
        peso: "13 kg",
        categoria: "Seed",
        habilidade: "Overgrow"
    },
    {
        id: 3,
        nome: "Venusaur",
        tipo: "Grass",
        imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/003.png",
        descricao: "Its plant blooms when it is absorbing solar energy. It stays on the move to seek sunlight.",
        altura: "2.0 m",
        peso: "100.0 kg",
        categoria: "Seed",
        habilidade: "Overgrow"
    },
];
// let pokemon = undefined;

let pokemon = {
    id: "",
    nome: "",
    tipo: "",
    imagem: "",
    descricao: "",
    altura: "",
    peso: "",
    categoria: "",
    habilidade: ""

}

// Rotas

//index - home
app.get("/", (req, res) => {
    res.render("index", { pokedex, pokemon });
});
//contato 
app.get("/contato", (req, res) => {
    res.render("contato")
});

//detalhes
app.get("/detalhes/:id", (req, res) => {
    const id = +req.params.id;
    pokemon = pokedex.find((pokemon) => pokemon.id === id);
    res.render("detalhes", { pokemon });
});

// cadastro
app.post("/cadastro", (req, res) => {
    const pokemon = req.body;
    pokemon.id = pokedex.length + 1;
    pokedex.push(pokemon);

});

app.get("/cadastro", (req, res) => {
    res.render("cadastro", { pokemon });
})
//editar
app.get("/cadastro/:id", (req, res) => {
    
    pokemon = pokedex.find((pok) => pok.id === +req.params.id);    
    res.render("cadastro", { pokemon });
})

app.post("/update/:id", (req, res) => {
    const id = +req.params.id - 1;
    const newPokemon = req.body;
    newPokemon.id = id + 1;
    pokedex[id] = newPokemon;
    pokemon = undefined;
    res.redirect("/");
});


//deletar 
app.get("/delete/:id", (req, res) => {
    const id = +req.params.id - 1;
    delete pokedex[id];
    res.redirect("/#cards");
});

app.listen(port, () =>
    console.log(`Servidor rodando em http://localhost:${port}`)
);