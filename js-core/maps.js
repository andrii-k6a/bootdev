const map = new Map();

map.set("foo", "bar");
map.set(1, 9);

const key = { name: "Sean" };
const value = { location: "Mars" };

map.set(key, value);

console.log(map);

key.name = "xyz";
value.location = "unknown";

console.log(map);

const copy = new Map(map);

key.name = "clone";
value.location = "empty";

console.log(map);
console.log(copy);

console.log(copy.get(key));
console.log(copy.get({ name: key.name })); // undefined because lookup by obj reference

