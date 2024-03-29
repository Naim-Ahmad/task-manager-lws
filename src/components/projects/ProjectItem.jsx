import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { syncCheckedProjects, toggleProject } from "../../redux/features/filter/filterSlice";

export default function ProjectItem({ project }) {
  const { projectName, colorClass } = project;
  const { checkedProjects } = useSelector(state => state.filter)
  const dispatch = useDispatch()

  useEffect(() => {
    const checkedProjectsLocal = JSON.parse(localStorage.getItem('checkedProjects'))
    if(checkedProjectsLocal){
      dispatch(syncCheckedProjects(checkedProjectsLocal))
    }
  }, [dispatch])

  const handleProject = () => {
    dispatch(toggleProject(projectName))
  }

  return (
    <div  className="checkbox-container">
      <input onChange={handleProject} type="checkbox" className={`color-scoreboard ${colorClass}`} checked={checkedProjects.includes(projectName)}/>
      <p className="label">{projectName}</p>
    </div>
  )
}