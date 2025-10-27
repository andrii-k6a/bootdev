type Notif = "email" | "sms" | "push";

function sendNotification(notif: Notif) {
    switch (notif) {
        case "email":
            return "Sending email";
        case "sms":
            return "Sending SMS";
        case "push":
            return "Sending push notification";
    }
    // TypeScript sees it as unreachable code and can give comilation error on such things if confifured so
    return "Unknown notification type";
}

console.log(sendNotification("sms"));

