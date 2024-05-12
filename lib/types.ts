import { Url } from "next/dist/shared/lib/router/router"

export interface mongoUserInterface{
    _id : string,
    id : string,
    courses : CourseInterface[],
    mongoUser : boolean,
    name : string,
    isTeacher : boolean
}

export interface CourseInterface{
    _id : string,
    name : string,
    coursePicture : Url | string,
    content : string,
    posts : any[],
    videos : {
        title : string,
        video : string | Url
    }[],
    author : string,
        
}

export interface PostInterface{
    id : string,
    body : string,
    createdAt : Date,
    author : string,
    isParent : boolean,
    children : PostInterface[],
    lessonFromCourse : string,
    courseId : string,
    isAnswer? : boolean
}