import { Band } from "src/app/bands/models/band.model";

export class Album{
    id!: number;
    createdAt!: Date;
    updatedAt!: Date;
  
    name!: string;
    yearReleased!: number;
    bandId!: number;
  
    band!: Band;
}