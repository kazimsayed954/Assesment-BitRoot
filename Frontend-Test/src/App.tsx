import { useEffect, useState } from "react";

import "./App.scss";
import { POST } from "./types/post.type";
import { PostList } from "./components/PostList/PostList";

const URL =
  "https://my-json-server.typicode.com/Codeinwp/front-end-internship-api/posts";
const fetchData = async () => {
  try {
    const res = await fetch(URL);
    const respJSON = await res.json();
    return respJSON;
  } catch (error) {
    console.error("error in fetch data", error);
    return [];
  }
};

function App() {
  const [data, setData] = useState<Array<POST>>([]);

  useEffect(() => {
    const getData = async () => {
      const res = await fetchData();
      setData(res);
    };
    getData();
  }, []);
  return (
    <>
      <div className="app-container">
          <PostList posts={data}/>
      </div>
    </>
  );
}

export default App;
