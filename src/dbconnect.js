import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb+srv://Emersonwpprado:code070596pp@cluster0.dayhe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true })

let collections;

try{
    await client.connect();
    const db = client.db("Mit-sheet-cluster");
    collections = db.collection("Mit-sheet");
    console.log("conectado na db com sucesso")
}catch(error){
    console.log(error)
};

connectDB();

export { collections };
