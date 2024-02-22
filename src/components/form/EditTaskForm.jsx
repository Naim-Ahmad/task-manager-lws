import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddTaskMutation } from "../../redux/features/api/taskApi";

export default function EditTaskForm({ members, projects }) {

  const [addTask, {isSuccess}] = useAddTaskMutation() 
  const navigate = useNavigate()

  useEffect(()=>{
    if(isSuccess){
      navigate('/')
    }
  }, [isSuccess, navigate])

  const handleSubmit = e => {
    e.preventDefault()
    const taskName = e.target.taskName.value;
    const memberId = e.target.teamMember.value;
    const projectId = e.target.project.value;
    const deadline = e.target.deadline.value;
    const taskInfo = {
      taskName,
      teamMember: members.find(member=> member.id == memberId),
      project: projects.find(project=> project.id == projectId),
      deadline,

    }

    addTask(taskInfo)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="fieldContainer">
        <label htmlFor="lws-taskName">Task Name</label>
        <input
          type="text"
          name="taskName"
          id="lws-taskName"
          required
          placeholder="Implement RTK Query"
        />
      </div>

      <div className="fieldContainer">
        <label>Assign To</label>
        <select defaultValue="select" name="teamMember" id="lws-teamMember" required>
          <option value="select" hidden>Select Job</option>
          {
            members.map(member => <option key={member.id} value={member.id}>{member.name}</option>)
          }

        </select>
      </div>
      <div className="fieldContainer">
        <label htmlFor="lws-projectName">Project Name</label>
        <select defaultValue={"selected"} id="lws-projectName" name="project" required>
          <option value="selected" hidden>Select Job</option>
          {
            projects.map(project => <option key={project.id} value={project.id}>{project.projectName}</option>)
          }
        </select>
      </div>

      <div className="fieldContainer">
        <label htmlFor="lws-deadline">Deadline</label>
        <input type="date" name="deadline" id="lws-deadline" required />
      </div>

      <div className="text-right">
        <button type="submit" className="lws-submit">Save</button>
      </div>
    </form>
  )
}