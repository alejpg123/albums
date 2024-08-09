import { mongoose } from "mongoose";
export const { ObjectId } = mongoose.Types;
const currentYear = new Date().getFullYear()

const albumSchema = mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true,
        },
        artista: {
            type: String,
            required: true,
            trim: true,
        },
        genero: {
            type: String,
            required: true,
            trim: true,
        },
        duracion: String,
        cantidad_canciones: Number,
        año: {
            type: Number,
            required: true,
            trim: true,
            min: [1860, "Year must be at least 1860"],
            max: [currentYear, `Year cannot exceed ${currentYear}`],
        },
    },
        { timestamps: true }
);
albumSchema.set("toJSON", {
    transform(doc, ret){
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
})

export const Album = mongoose.model("Album", albumSchema);
