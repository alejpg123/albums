import { connect } from "mongoose";

const db_uri = process.env.db_uri;
async function main(){
    await connect(db_uri);
}
main()
    .then(() =>
    console.log("MongoDB Database on Mongo Atlas Cloud Servvice Connected."))
    .catch((err) => console.log(`Database connection failed: ${err.message}`));
