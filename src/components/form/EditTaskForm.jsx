import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useEditTaskMutation } from "../../redux/features/api/taskApi";

export default function EditTaskForm({ members, projects, task }) {

  const [editTask, {isSuccess}] = useEditTaskMutation() 
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

    editTask({taskId: task.id, taskData: taskInfo})
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
          defaultValue={task.taskName}
          placeholder="Implement RTK Query"
        />
      </div>

      <div className="fieldContainer">
        <label>Assign To</label>
        <select defaultValue={task.teamMember.id} name="teamMember" id="lws-teamMember" required>
          <option value="select" hidden>Select Job</option>
          {
            members.map(member => <option key={member.id} value={member.id}>{member.name}</option>)
          }

        </select>
      </div>
      <div className="fieldContainer">
        <label htmlFor="lws-projectName">Project Name</label>
        <select defaultValue={task.id} id="lws-projectName" name="project" required>
          <option value="selected" hidden>Select Job</option>
          {
            projects.map(project => <option key={project.id} value={project.id}>{project.projectName}</option>)
          }
        </select>
      </div>

      <div className="fieldContainer">
        <label htmlFor="lws-deadline">Deadline</label>
        <input defaultValue={task.deadline} type="date" name="deadline" id="lws-deadline" required />
      </div>

      <div className="text-right">
        <button type="submit" className="lws-submit">Save Changes</button>
      </div>
    </form>
  )
}