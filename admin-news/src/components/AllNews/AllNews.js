import axios from "axios";
import {useEffect, useState} from "react";

const AllNews = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/get-news").then((response) => {console.log(response)
      let objectsArray = response.data.map(jsonString => JSON.parse(jsonString.data));
      setNews(objectsArray);
    }).catch((error) => {console.log(error)});
  }, []);

  console.log(news);
  return <span style={{width: "100%", display: "flex", justifyContent: "space-around", margnTop: "150px"}}>{news?.length > 0 && news.map((data) => <div className="card">
    <img src={data.image} alt="Image"/>
    <div className="card-content">
    <h2>Titlu: {data.title}</h2>
    <p className="property">Tip: {data.type}</p>
    <p>Descriere: {data.content}</p>
    </div></div>)}</span>;
};

export default AllNews;
