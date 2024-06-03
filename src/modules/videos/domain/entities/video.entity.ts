import { Optional } from "@nestjs/common";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Video {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    title: string;

    @Column('text')
    videoUrl: string;

    @Column('text', {
        default: 'Ejemplo'
    })
    miniatureUrl: string;

    @Column('text', {
        nullable: true
    })
    description?: string;

    @Column('numeric', {
        nullable: true
    })
    duration?: number;

    @Column('bool', {
        default: true
    })
    isPublic: boolean;

}