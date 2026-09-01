const express = require("express");
const port = 3000;

let nextId = 1;
const animeList = [
    { id: nextId++, name: "Monkey D. Luffy", series: "One Piece" },
    { id: nextId++, name: "Ichigo Kurosaki", series: "Bleach" },
    { id: nextId++, name: "Tanjiro Kamado", series: "Demon Slayer" },
];

const app = express();

app.use(express.json());

app.post("/anime", (request, response) => {
    const newName = request.body.name;
    const newSeries = request.body.series;

    const newCharacter = { id: nextId++, name: newName, series: newSeries };

    animeList.push(newCharacter);

    response.send(newCharacter);
});

app.listen(3000, () => {
    console.log("App is listening to port 3000");
});