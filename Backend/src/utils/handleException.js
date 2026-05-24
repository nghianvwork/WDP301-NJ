let isShuttingDown = false;

const shutdown = (server, exitCode = 1) => {
    if (isShuttingDown) {
        return;
    }

    isShuttingDown = true;

    if (!server) {
        process.exit(exitCode);
        return;
    }

    server.close((error) => {
        if (error) {
            console.error("Error while closing server:", error);
            process.exit(1);
            return;
        }

        process.exit(exitCode);
    });
};

const handleException = (server = null) => {
    process.on("uncaughtException", (error) => {
        console.error("Uncaught exception:", error);
        shutdown(server);
    });

    process.on("unhandledRejection", (reason) => {
        console.error("Unhandled rejection:", reason);
        shutdown(server);
    });

    process.on("SIGTERM", () => {
        console.info("SIGTERM received");
        shutdown(server, 0);
    });
};

export default handleException;
