import './App.css'
import NavBar from "./components/NavBar.tsx";
import {PersonPanel} from "./components/PersonPanel.tsx";
import UserContent from "./components/UserContent.tsx";
import {UserProvider} from "./components/content/ContentContext.tsx";

function App() {

  return (
      <>
        <NavBar/>
        <div className="row mt-2">
          <UserProvider>
            <PersonPanel />
            <UserContent />
          </UserProvider>
        </div>
      </>
  )
}

export default App
