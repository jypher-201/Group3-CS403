let nextId = 1;
const animeList = [
    { id: nextId++, name: "Monkey D. Luffy", series: "One Piece" },
    { id: nextId++, name: "Ichigo Kurosaki", series: "Bleach" },
    { id: nextId++, name: "Tanjiro Kamado", series: "Demon Slayer" },
];

module.exports = { animeList, getNextId: () => nextId++ };