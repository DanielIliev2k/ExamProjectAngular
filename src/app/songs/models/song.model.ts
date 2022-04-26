import { Album } from "src/app/albums/models/album.model";
import { Band } from "src/app/bands/models/band.model";

export class Song{
    id!: number;
  createdAt!: Date;
  updatedAt!: Date;

  name!: string;
  yearReleased!: Date;
  bandId!: number;
  albumId!: number;

  band!: Band;
  album!: Album;
}