import CourseComponent from "@/components/courseComponent";
import { getMongoUser } from "@/lib/actions/userActions";
import { currentUser } from "@clerk/nextjs/server";


export default async function Home() {
  let userId ;
  let mongoId;
  let courses
  const user = await currentUser()
  userId = user? user.id : ''
  const mongoUser = await getMongoUser(userId)
  if(!mongoUser){mongoId = undefined ,  courses = undefined}
  if(Array.isArray(mongoUser)){ mongoId = undefined , courses = undefined}
  else{mongoId = mongoUser?._id , courses = mongoUser?.courses }

  return (
   <CourseComponent 
      mongoId = { mongoId as string}
      courses = {courses}
      />
  );
}
