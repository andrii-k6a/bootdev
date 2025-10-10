const unique = new Set([2, 0, 4, 8, 8, 8]);

console.log(unique);

unique.add(16);
unique.delete(0);

console.log(unique);
console.log([...unique]); // to array

const a = new Set([1, 2, 3, 4]);
const b = new Set([3, 4, 5, 6]);

console.log(a.intersection(b));
console.log(b.intersection(a));

console.log(a.difference(b));
console.log(b.difference(a));

console.log(a.union(b));
console.log(b.union(a));

