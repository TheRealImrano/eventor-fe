import EventManagement from './component/Event';
import AddEvent from './component/AddEvent';
import DeleteEvent from './component/DeleteEvent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminHome from './component/AdminHome';
import Register from './component/Register';
import Joined from './component/Joined';
import Login from './component/Login';
import UserEvent from './component/UserEvent';
import SingleEvent from './component/SingleEvent';
function App() {
  
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/fetchevent" element={<EventManagement />} />
          <Route path="/event/:id" element={<SingleEvent/>}/>
          <Route path="/AddEvent" element={<AddEvent />} />
          <Route path="/DeleteEvent" element={<DeleteEvent />} />
          <Route path="/adminhome" element={<AdminHome/>} />
          <Route path="/joined" element={<Joined/>} />
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
            <Route path="/myevents" element={<UserEvent/> } />

        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
