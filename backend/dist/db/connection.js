import { connect, disconnect } from "mongoose";
async function ConnectToDatabase() {
    try {
        await connect(process.env.MONGODB_URI);
    }
    catch (error) {
        console.log(error);
        throw new Error("Cannot Connect To MongoDB");
    }
}
async function DisconnectFromDatabase() {
    try {
        await disconnect();
    }
    catch (error) {
        console.log(error);
        throw new Error("Cannot Disconnect From MongoDB");
    }
}
export { ConnectToDatabase, DisconnectFromDatabase };
//# sourceMappingURL=connection.js.map