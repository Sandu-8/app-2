import './App.scss';
import Header from "./components/Header/Header";
import {useState} from "react";
import {TAB} from "./constants/Tab";
import AllNews from "./components/AllNews/AllNews";
import AddNews from "./components/AddNews/AddNews";

function App() {
  const [tab, setTab] = useState(TAB.ADD_NEWS);
  return (<><Header setTab={setTab}/>
    {TAB.ALL_NEWS == tab && <AllNews/>}
    {TAB.ADD_NEWS == tab && <AddNews/>}
  </>);
}

export default App;
