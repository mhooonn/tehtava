const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

// dummy database
let games = [
    {
        id: 1,
        name: 'Counter-Strike',
        rating: "5/5",
        image: 'cs.jpg',
        releaseDate: "27.9.2023",
        peakCount: 1862531
    },
    {
        id: 2,
        name: 'Apex Legends',
        rating: "4/5",
        image: 'apex.jpg',
        releaseDate: "4.2.2019",
        peakCount: 624473
    },
    {
        id: 3,
        name: 'Player Unknowns Battleground',
        rating: "3/5",
        image: 'pubg.jpg',
        releaseDate: "23.3.2017",
        peakCount: 3257248
    },
    {
        id: 4,
        name: 'Kingdom Come Deliverance 2',
        rating: "4.5/5",
        image: 'kcd2.png',
        releaseDate: "4.2.2025",
        peakCount: 256206
    },
    {
        id: 5,
        name: 'Call of duty',
        rating: "3/5",
        image: 'cod.png',
        releaseDate: "8.3.2023",
        peakCount: 61667
    }
];

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

// static files
app.use(express.static('public'));

// home
app.get('/', (req,res) => {
    res.render('index', {
        title: "games ltd",
        games: games,
        itemsTotal: games.length
    });
});

// GET ALL
app.get('/api/games', (req,res) => {
    res.status(200).json({
        status: 'success',
        results: games.length,
        data: games
    })
});

// GET ONE
app.get('/api/games/:id', (req,res) => {

    const id = Number(req.params.id);
    const game = games.find(games => games.id === id);

    if (game)
    {
        res.json(game);
    }
    else
    {
        res.status(404).json({
            msg: 'not found'
        })
    }
});

// DELETE ONE
app.delete('/api/games/:id', (req,res) => {
    const idToRemove = Number(req.params.id);

    // first check that the deleted product be found
    const game = games.find(game => game.id === idToRemove);

    if (game) {
        games = games.filter(games =>games.id != idToRemove);
        res.status(200).json({
            id: idToRemove,
            msg: 'resource deleted successfully'
        });
    }
    else
    {
        res.status(404).json({
            msg: 'could not find the product'
        })
    }

    res.json(games);

});

// CREATE
app.post('/api/games', (req,res) => {

    if(req.body.name && req.body.releaseDate && req.body.rating && req.body.releaseDate && req.body.peakCount) {
        const newID = games[games.length-1].id + 1;

        const newGame = {
            id: newID,
            name: req.body.name,
            rating: req.body.rating,
            releaseDate: req.body.releaseDate,
            peakCount: req.body.peakCount
        }

        games.push(newGame);

        const url = `${req.protocol}://${req.get('host')}${req.originalUrl}${newID}`;

        res.location(url);
        res.status(201).json(newGame);
    }
    else 
    {
        res.status(400).json({
            msg: 'additional data needed'
        })
    }
});

// UPDATE
app.patch('/api/games/:id', (req,res) => {
    const id = Number(req.params.id);

    const game = games.find(game => game.id === id);

    if (game) {
        games.forEach(game => {
            if (game.id===id){
                game.name = req.body.name,
                game.rating = req.body.rating,
                game.releaseDate = req.body.releaseDate,
                game.peakCount = req.body.peakCount
            }
        });

        const updatedGame = {
            id, //id: id,
            name: req.body.name,
            rating: req.body.rating,
            releaseDate: req.body.releaseDate,
            peakCount: req.body.peakCount
        }

        res.status(200).json(updatedGame);
    }
    else {
        res.status(404).json({
            msg: 'could not update the product'
        })
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));