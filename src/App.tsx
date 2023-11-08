import AddTodo from "./components/AddTodo"
import NavBar from "./components/NavBar"
import Todos from "./components/Todos"


function App() {

  return (
    <div className="">
    <h1>TODO React + TypeScript</h1>
    <NavBar />
    <AddTodo />
    <Todos />
    </div>
  )
}

export default App
