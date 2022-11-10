import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Settings from "./Pages/Settings/Settings";
import Compose from "./Pages/Compose/Compose";
import SinglePostPage from "./Pages/SinglePost/SinglePostPage.jsx";
import Home from "./Pages/Home/Home";
import { Context } from "./Context/Context";
import { useContext } from "react";
import Blogs from "./Pages/Blogs/Blogs";

function App() {
  const { user } = useContext(Context);

  return (
    <div className="App">
      <Navbar user={user} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/post/:id" element={<SinglePostPage user={user} />} />
        <Route
          path="/compose"
          element={user ? <Compose user={user} /> : <Register />}
        />
        <Route
          path="/settings"
          element={user ? <Settings user={user} /> : <Register />}
        />
        <Route path="/login" element={!user ? <Login /> : <Home />} />
        <Route path="/register" element={!user ? <Register /> : <Home />} />
      </Routes>
    </div>
  );
}

export default App;
