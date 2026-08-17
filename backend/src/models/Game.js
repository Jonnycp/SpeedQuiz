const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({

    hostUsername: { 
        type: String,
        required: true
    },

    maxPlayers: { 
            type: Number, 
            required: true,
        },

    players: [
        {
        user: { type: mongoose.Schema.Types.ObjectId, 
            ref: "User" },
            username: { 
                type: String 
            },
            score: { 
                type: Number, 
                default: 0 
            },
            isWinner: { 
                type: Boolean, 
                default: false 
            }
        }
    ],
    createdAt: { 
        type: Date, 
        default: Date.now 
        }
});

module.exports = mongoose.model("Game", GameSchema);