const healthStatus = {
    level: 3,
    isAlive: true,
    subsystems: [
        {
            id: 1,
            status: "UP",
        },
        {
            id: 2,
            status: "UP",
        },
    ],
    check() {
        if (this.isAlive && this.subsystems.filter(s => s.status !== "UP").length === 0) {
            return "Ok";
        }
    }
};

const info = {
    level: 911,
    description: "My server",
    count: 3,
    check() {
        return "unknown";
    }
};

// latest key wins if same
console.log({ ...healthStatus, ...info });
console.log({ ...info, ...healthStatus });

