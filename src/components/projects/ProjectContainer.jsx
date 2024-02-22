import { useGetAllProjectsQuery } from "../../redux/features/api/projectAPI";
import ProjectItem from "./ProjectItem";

export default function ProjectContainer() {

  const {data: projects, isLoading, isError, error} = useGetAllProjectsQuery()

  let content = null;
  if (isLoading && !isError) {
    content = <div>Loading...</div>
  } else if (!isLoading && isError) {
    content = <div>{error?.data}</div>
  } else if (!isLoading && !isError && projects.length === 0) {
    content = <div>No Project here</div>
  } else {
    content = projects.map(project => <ProjectItem key={project.id} project={project} />)
  }

  return (
    <div>
      <h3 className="text-xl font-bold">Projects</h3>
      <div className="mt-3 space-y-4">
        {content}
      </div>
    </div>
  )
}