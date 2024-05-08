import { Url } from "next/dist/shared/lib/router/router"

export interface mongoUserInterface{
    _id : string,
    id : string,
    courses : {
        _id : string,
        name : string,
        coursePicture : Url | string,
        videos : {
            title : string,
            video : string | Url
        }[],
        author : string,
    }[],
    mongoUser : boolean,
    name : string
}