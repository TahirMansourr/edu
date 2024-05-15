import CourseComponent from "@/components/courseComponent";
import { getMongoUser } from "@/lib/actions/userActions";
import { currentUser } from "@clerk/nextjs/server";


export default async function Home() {
  let userId;
  let mongoId;
  const user = await currentUser()
  userId = user? user.id : ''
  const mongoUser = await getMongoUser(userId)
  mongoId = mongoUser? mongoUser : ''
  return (
   <CourseComponent/>
  );
}
