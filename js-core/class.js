class Band {
    constructor(name, members, genre) {
        this.name = name;
        this.members = members;
        this.genre = genre;
    }
}

const band = new Band(
    "Snakes From The Moon",
    ["Alex Mimho", "Tina Droykie", "Ducle Telyche"],
    "jazz"
);

console.log(band);

