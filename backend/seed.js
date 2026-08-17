const mongoose = require('mongoose');
const questions = require('./domande_.json')
require('dotenv').config();

const Question = require('./src/models/Question');
const mongoUri = process.env.MONGODB_URI;

async function seed(){
    try{
        await mongoose.connect(mongoUri)
        console.log(`Connessione a MongoDB riuscita`);

        //* Svuota la collection delle domande prima di un successivo caricamento
        await Question.deleteMany({});

        const insertedQuestions = await Question.insertMany(questions);
        console.log(`Inserite ${insertedQuestions.length} domande`);

        await mongoose.connection.close();


    }catch(err){
        console.error("Seed fallito", err.message);
        process.exit(1);
    }
}

seed();

