const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

// home
app.get('/', (req,res) => {
    res.render('index', {
        title: "games ltd"
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));