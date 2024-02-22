import { useParams } from "react-router-dom";
import EditTaskForm from "../components/form/EditTaskForm";
import { useGetAllProjectsQuery } from "../redux/features/api/projectAPI";
import { useGetTaskQuery } from "../redux/features/api/taskApi";
import { useGetAllMembersQuery } from "../redux/features/api/teamAPI";

export default function TaskEdit() {

  const { data: projects = [], isLoading: isProjectsLoading } = useGetAllProjectsQuery()
  const { data: members = [], isLoading: isMembersLoading } = useGetAllMembersQuery()
  const {taskId} = useParams()
  const {data:task, isLoading:isTaskLoading} = useGetTaskQuery(taskId)

  let content = null;
  if (isProjectsLoading || isMembersLoading || isTaskLoading) {
    content = <div>Loading...</div>
  } else {
    if (projects.length > 0 && members.length > 0) {
      content = <EditTaskForm members={members} projects={projects} task={task} />
    } else {
      content = <div>Something went wrong.</div>
    }
  }

  return (
    <div className="container relative">
      <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
        <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
          Edit Task for Your Team
        </h1>

        <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
          {content}
        </div>
      </main>
    </div>
  )
}