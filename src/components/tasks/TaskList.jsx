import { useSelector } from "react-redux";
import { useGetAllTaskQuery } from "../../redux/features/api/taskApi";
import TaskItem from "./TaskItem";

export default function TaskList() {

  const { data: tasks = [], isLoading, isError, error } = useGetAllTaskQuery()
  const {checkedProjects} = useSelector(state=> state.filter)

  let content = null;
  if (isLoading && !isError) {
    content = <div>Loading...</div>
  } else if (!isLoading && isError) {
    content = <div>{error?.data}</div>
  } else if (!isLoading && !isError && tasks.length === 0) {
    content = <div>No Task here</div>
  } else {
    if(checkedProjects.length > 0){
      const filterByCheckedProject = (task)=> checkedProjects.includes(task.project.projectName)
      
      content = tasks.filter(filterByCheckedProject).map(task => <TaskItem key={task.id} task={task} />)
    }else{
      content = <div>Please Check the project to see tasks.</div>
    }
  }

  return (
    <div className="lws-task-list">
      {content}
    </div>
  )
}