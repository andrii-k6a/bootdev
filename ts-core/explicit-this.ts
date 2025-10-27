// TypeScript is pretty smart (especially newer versions) and usually infers the type of
// this correctly. However, if you want to explicitly control the type of this,
// you can use the special this parameter
// https://www.typescriptlang.org/docs/handbook/2/functions.html#declaring-this-in-a-function

class Counter {
    private count: number = 0;

    increment(this: Counter, n: number): void {
        // 'this' is explicitly typed as Counter
        // the `this` parameter is not available at runtime
        // it is only used for type checking
        this.count += n;
    }

    getCount(this: Counter): number {
        // 'this' is explicitly typed as Counter
        return this.count;
    }
}

const counter = new Counter();
counter.increment(5);
console.log(counter.getCount());
// 5

