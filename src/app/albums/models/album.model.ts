import { Band } from "src/app/bands/models/band.model";
import { Song } from "src/app/songs/models/song.model";

export class Album{
    id!: number;
    createdAt!: Date;
    updatedAt!: Date;
  
    name!: string;
    yearReleased!: Date;
    bandId!: number;
    songIds!: number[];
    pictureUrl!:string;
  
    band!: Band;
    songs!:Song[];
}