function wrap<T>(item: T) {
    return {
        wrapped: true,
        item: item
    };
}

console.log(wrap<string>("present"));
console.log(wrap("present"));
console.log(wrap(319));


interface HasCost {
    cost: number;
}

function applyDiscount<T extends HasCost>(vals: T[], discount: number): T[] {
    const arr: T[] = [];
    // vals.push({ cost: 2 }); // error due to PECS principle
    for (const val of vals) {
        val.cost *= discount;
        arr.push(val);
    }
    return arr;
}

export function pluckEmails<T extends { email: string }>(arr: T[]) {
    return arr.map(e => e.email);
}

console.log(pluckEmails([
    { email: "foo1@bar.com" },
    { email: "foo2@bar.com" },
    // { foo: "bar" }, // email prop is missing
]));


interface Box<T> {
    items: Record<number, T>;

    get(id: number): T;
    add(id: number, item: T): void;
    all(): T[];
}

const presentsBox: Box<{ tag: string }> = {
    items: {} as Record<string, { tag: string }>,

    get(id: number) {
        return this.items[id];
    },
    add(id: number, item: { tag: string }) {
        this.items[id] = item;
    },
    all(): { tag: string }[] {
        return Object.values(this.items);
    },
};

presentsBox.add(1, { tag: "phone" });
presentsBox.add(2, { tag: "watch" });
console.log(presentsBox.all());
console.log(presentsBox.get(1));
console.log(presentsBox.get(2));

