type Person = {
    name: string;
    story: string;
}

type Pet = {
    name: string;
    owner: string;
}

// must have all merged props
type Mutant = Person & Pet;

const m1: Mutant = {
    name: "David",
    story: "Who am I?..",
    owner: "Corp. LTD"
};

type PersonOrPet = Person | Pet;

const pp1: PersonOrPet = {
    name: "Can have both person and pet props",
    owner: "David",
    story: "unknown",
}

const pp2: PersonOrPet = {
    name: "Can have just person's props",
    story: "no story",
}

const pp3: PersonOrPet = {
    name: "Can have just pet's props",
    owner: "no owner",
}

