import CourseComponent from "@/components/courseComponent";
import { getMongoUser } from "@/lib/actions/userActions";
import { mongoUserInterface } from "@/lib/types";
import { currentUser } from "@clerk/nextjs/server";


export default async function Home() {
  let userId ;
  let mongoId;
  let courses;
  let isTeacher;
  const user = await currentUser()
  userId = user? user.id : ''
  const mongoUser : mongoUserInterface | null = await getMongoUser(userId)
  if(!mongoUser){mongoId = undefined ,  courses = undefined}
  if(Array.isArray(mongoUser)){ mongoId = undefined , courses = undefined}
  else{mongoId = mongoUser?._id , courses = mongoUser?.courses , isTeacher = mongoUser?.isTeacher}

  return (
   <CourseComponent 
      mongoId = { mongoId}
      courses = {courses}
      isTeacher = {isTeacher? isTeacher : false}
      />
  );
}
