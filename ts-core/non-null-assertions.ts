type News = {
    title: string;
    content: string;
}

function news(): News | undefined {
    if (Math.random() > 0.5) {
        return {
            title: "Breaking news! BTC hits 1M!",
            content: "Just kidding.",
        };
    }
}

function notify(news: News) {
    console.log(`Attention! ${news.title} - ${news.content}`);
}

const currentNews = news();

// Argument of type 'News | undefined' is not assignable to parameter of type 'News'
// notify(currentNews); 

// non-null assertion operator `!` tells the compiler that a value cannot be null or undefined, even when the type system thinks it might be
// because of that it might throw TypeError: Cannot read properties of undefined (reading 'title')
notify(currentNews!);

