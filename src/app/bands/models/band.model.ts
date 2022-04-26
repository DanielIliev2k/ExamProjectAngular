import { Album } from "src/app/albums/models/album.model";

export class Band{
    id!: number;
    createdAt!: Date;
    updatedAt!: Date;
  
    name!: string;
    yearFormed!: Date;
    albumIds!: number[];
    members!: string[];
  
    albums!: Album[];
}