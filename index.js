const express = require('express');
const exphbs = require('express-handlebars');

// dummy database
let games = [
    {
        name: 'Counter-Strike',
        rating: "5/5",
        image: 'cs.jpg',
        releaseDate: "27.9.2023",
        peakCount: 1862531
    },
    {
        name: 'Apex Legends',
        rating: "4/5",
        image: 'apex.jpg',
        releaseDate: "4.2.2019",
        peakCount: 624473
    },
    {
        name: 'Player Unknowns Battleground',
        rating: "3/5",
        image: 'pubg.jpg',
        releaseDate: "23.3.2017",
        peakCount: 3257248
    },
    {
        name: 'Kingdom Come Deliverance 2',
        rating: "4.5/5",
        image: 'kcd2.png',
        releaseDate: "4.2.2025",
        peakCount: 256206
    },
    {
        name: 'Call of duty',
        rating: "3/5",
        image: 'cod.png',
        releaseDate: "8.3.2023",
        peakCount: 61667
    }
];

const app = express();

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


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));