import AddTaskForm from "../components/form/AddTaskForm";
import { useGetAllProjectsQuery } from "../redux/features/api/projectAPI";
import { useGetAllMembersQuery } from "../redux/features/api/teamAPI";

export default function TaskAddPage() {

  const { data: projects, isLoading: isProjectsLoading } = useGetAllProjectsQuery()
  const { data: members, isLoading: isMembersLoading } = useGetAllMembersQuery()

  let content = null;
  if (isProjectsLoading && isMembersLoading) {
    content = <div>Loading...</div>
  } else {
    if (projects.length > 0 && members.length > 0) {
      content = <AddTaskForm members={members} projects={projects} />
    } else {
      content = <div>Please Check the project to see tasks.</div>
    }
  }

  return (
    <div className="container relative">
      <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
        <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
          Create Task for Your Team
        </h1>

        <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
          {content}
        </div>
      </main>
    </div>
  )
}