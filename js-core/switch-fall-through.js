function breakingAndFallThroughInSwitch(str) {
    switch (str) {
        case "a":
            console.log("hello from 'a'")
            break;
        case "b":
            console.log("hello from 'b'")
        case "c":
            console.log("hello from 'c'")
        default:
            console.log("hello from default")
    }
}

breakingAndFallThroughInSwitch("a")

console.log()
breakingAndFallThroughInSwitch("b")

console.log()
breakingAndFallThroughInSwitch("c")

