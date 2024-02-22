import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import TaskAddPage from './pages/TaskAddPage.jsx'
import TaskEdit from './pages/TaskEdit.jsx'
import TaskManagerHome from './pages/TaskManagerHome.jsx'
import store from './redux/store/store.js'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <TaskManagerHome />
      },
      {
        path: "/edit/:taskId",
        element: <TaskEdit />
      },
      {
        path: "/addTask",
        element: <TaskAddPage />
      },

    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
