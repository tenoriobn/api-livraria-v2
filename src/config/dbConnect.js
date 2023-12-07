import mongoose from "mongoose"

mongoose.connect("mongodb+srv://tenoriobn:soutthh344866@cluster0.pwxgzrh.mongodb.net/livraria?retryWrites=true&w=majority");

let db = mongoose.connection;

export default db;