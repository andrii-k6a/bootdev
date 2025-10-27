type Boss = {
    accessLevel: 99;
    department: string;
};

type ImposterBoss = {
    accessLevel: 99;
    department: string;
};

type Admin = {
    accessLevel: number;
    payrollDate: Date;
};

type Manager = {
    numEmployees: number;
};

type Employee = Boss | Admin | Manager | ImposterBoss;

// Note the return type - it's type predicate
function isBoss(role: Employee): role is Boss {
    return "accessLevel" in role && role.accessLevel === 99;
}

function doWork(e: Employee) {
    if (isBoss(e)) {
        console.log("Now TS knows that this is the boss", e.accessLevel)
    } else if ("accessLevel" in e && e.accessLevel === 99) {
        // never the case because it's the same condition as the prev one
        console.log(`Hacking the system... ${e}`);
    } else {
        console.log(`Working... ${e}`);
    }

}

const e = {
    accessLevel: 99 as const, // without `as const`, TS interprets it as number
    department: "Finance",
}
doWork(e);

