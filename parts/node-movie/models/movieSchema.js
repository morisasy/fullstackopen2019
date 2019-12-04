const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    name: String,
    year: Number,
    directorID: mongoose.Schema.Types.ObjectId,
    actorIDs: [mongoose.Schema.Types.ObjectId],
    genres: [String],
    isAvailable: Boolean,
    dateAdded: {
        type: Date,
        default: Date.now
    }
});

const personSchema = new Schema({
    name: String,
    birthDate: Date,
    country: String,
    biography: String,
    role: String // "actor" or "director"
});

const genres = ["sci-fi", "adventure", "action", "romantic", "animated", "comedy"];
const Movie = mongoose.model("Movie", movieSchema);
const Person = mongoose.model("Person", personSchema);

export default { genres, Movie, Person}