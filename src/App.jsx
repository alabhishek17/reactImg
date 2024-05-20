import { useState } from 'react';
import './App.css'
// import Index from './components/Image/index'
function App() {
  const [search, setSearch] = useState("");
  const [generatImg, setGeneratImg] = useState("");

  const API_TOKEN = "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";


  async function query(data) {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/prompthero/openjourney-v4",
      {
        headers: { Authorization: "Bearer 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" },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.blob();
    return result;
  }
  // query({"inputs": "Astronaut riding a horse"}).then((response) => {
  // 	// Use image
  // });


  const generatBtn = async () => {
    await query({ "inputs": search }).then((response) => {
      const imgSrc = URL.createObjectURL(response);
      setGeneratImg(imgSrc);
      console.log(response);
    }).catch(err => console.log(err))

  }

  return (
    <>
      <div style={{ display: "flex" ,marginLeft:"450px",flexDirection:"column",padding:"30px"}}>
        <div>
          <input type="text" placeholder="Search Imges" value={search} onChange={(e) => setSearch(e.target.value)} style={{ padding: "10px" }} />
          <button onClick={generatBtn} style={{ padding: "10px", backgroundColor: "blue", color: "white" }} >submit</button>
        </div>
        <div style={{margin:"10px"}}>
          <img src={generatImg} alt="" />
        </div>


      </div>
    </>
  )
}

export default App
