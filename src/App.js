import { useState, useEffect } from "react";
import "./App.css";
import Card from "./Card";
import Spinner from "react-bootstrap/Spinner";

function App() {
  const [news, setNews] = useState([]);
  const [image, setImage] = useState([]);
  const [blocks, setBlocks] = useState(1);
  const [blocksImage, setBlocksImage] = useState(1);

  useEffect(() => {
    ;(async () => {
       await fetch_news(0)
      .then((res) => setNews(res.hits))
      .catch((err) => console.error("Error: ", err));
     
       await fetch_images(0)
       .then((res) => setImage(res))
       .catch((err) => console.error("Error: ", err));
       window.addEventListener("scroll", handleScroll);
    })()
  }, []);

  const fetch_news = async (dev) =>
    (
      await fetch(`https://hn.algolia.com/api/v1/search_by_date?query=${dev}`)
    ).json();
    
  const fetch_images = async (page) =>
    (await fetch(`https://picsum.photos/v2/list?${page}=2&limit=500`)).json();
  
    let idIterator = 0;
    news.forEach((newss) => {
    let newImage = image[idIterator];
    newss.image = newImage?.download_url;
    idIterator = idIterator + 1;
    
  });

  const more = async () => {
    const more_news = await fetch_news(blocks + 1);
    setBlocks((prev) => prev + 1);
    setNews((prev) => [...prev, ...more_news.hits]);

    const more_images = await fetch_images(blocksImage + 1);
    setBlocksImage((prev) => prev + 1);
    setImage((prev) => [...prev, ...more_images]);
  };

  const handleScroll = (e) => {
    if (
      window.innerHeight + e.target.documentElement.scrollTop + 1 >=
      e.target.documentElement.scrollHeight
    ) {
      more();
    }
  };

  return (
    <>
      <div className="head">
        <h1 className="head_title">NewsDev</h1>
        <h3 className="head_subtitle">
          The latest web and software development news
        </h3>
      </div>  
      <div className="Container">
      {news.map((news, index) => (
      
         <div className="Container_App" key={index}>
          <Card news={news} />
        </div>
      
       
      ))}  </div>
      {news && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      </>
  );
}

export default App;
