import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import lwsLogo from '../../assets/logo.svg'
import { setSearchText } from '../../redux/features/filter/filterSlice'

export default function Navbar() {

  const [search, setSearch] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    if (search === '') {
      dispatch(setSearchText(search))
    }
  }, [search, dispatch])

  const handleSearch = e => {
    e.preventDefault()
    if (search !== '') {
      dispatch(setSearchText(search))
    }
  }

  return (
    <nav className="container relative py-3">
      <div className="flex items-center justify-between">
        <Link to="/">
          <img src={lwsLogo} />
        </Link>
        <form onSubmit={handleSearch} className="flex-1 max-w-xs search-field group">
          <i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500"></i>
          <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search Task" className="search-input" id="lws-searchTask" />
        </form>
      </div>
    </nav>
  )
}