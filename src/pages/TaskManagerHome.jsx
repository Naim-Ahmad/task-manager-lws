import ProjectContainer from "../components/projects/ProjectContainer";
import TaskContainer from "../components/tasks/TaskContainer";
import TeamMemberContainer from "../components/teamMember/TeamMemberContainer";

export default function TaskManagerHome() {

  return (
    <div className="container relative">
      <div className="sidebar">
        {/* <!-- Projects List --> */}
        <ProjectContainer />

        {/* <!-- Team Members --> */}
        <TeamMemberContainer />
      </div>

      <div className="lg:pl-[16rem] 2xl:pl-[23rem]">
        <TaskContainer />
      </div>
    </div>
  )
}