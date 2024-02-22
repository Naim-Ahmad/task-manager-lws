import { useGetAllMembersQuery } from "../../redux/features/api/teamAPI";

export default function TeamMemberContainer() {

  const { data: members, isLoading, isError, error } = useGetAllMembersQuery()

  let content = null;
  if (isLoading && !isError) {
    content = <div>Loading...</div>
  } else if (!isLoading && isError) {
    content = <div>{error?.data}</div>
  } else if (!isLoading && !isError && members.length === 0) {
    content = <div>No member here</div>
  } else {
    content = members.map(member => {
      const { name, avatar } = member;
      return <div key={member.id} className="checkbox-container">
        <img src={avatar} className="team-avater" />
        <p className="label">{name}</p>
      </div>
    })
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold">Team Members</h3>
      <div className="mt-3 space-y-4">
        {content}
      </div>
    </div>
  )
}