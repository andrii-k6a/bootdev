type TextMessage = {
    content: string;
    sentAt: Date;
    length: number;
};

type ImageMessage = {
    caption: string;
    sentAt: Date;
    format: string;
};

type VideoMessage = {
    duration: number;
    sentAt: Date;
    resolution: string;
};

type Message = TextMessage | ImageMessage | VideoMessage;

function displayMessage(message: Message) {
    if ("content" in message) {

        // TypeScript knows this is a TextMessage
        // because it's the only one with a 'content' property
        console.log(`Text content is: ${message.content}`);
        console.log(`Text length is: ${message.length}`);

    } else if ("caption" in message) {

        // TypeScript knows this is an ImageMessage
        // because it's the only one with an 'caption' property
        console.log(`Image caption is ${message.caption}`);
        console.log(`Image format is ${message.format}`);

    } else {

        // TypeScript knows this is a VideoMessage because
        // it's the only other option
        console.log(`Video length is ${message.duration}`);
        console.log(`Video resolution is ${message.resolution}`);

    }
}

