const apple = {
    radius: 3,
    color: "green"
}

const { radius, color, unknown } = apple;
console.log(radius);
console.log(color);
console.log(unknown);

function wash({ color, radius }) {
    console.log(`Washing ${color} apple with a radius of ${radius}`);
}
wash(apple);

