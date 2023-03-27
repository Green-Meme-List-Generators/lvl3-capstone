import React, { useState, useEffect } from "react";
import axios from "axios"

function Meme() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });
  const [allMemes, setAllMemes] = useState([]);
  const [listMemes, setListMemes] = useState([])
  
  // useEffect function with axios get request to pull top 100 meme images from api
  useEffect(() => {
    axios
      .get("https://api.imgflip.com/get_memes")
      // .then((response) => console.log(response.data.data.memes))
      .then((response) => setAllMemes(response.data.data.memes))
      .catch((error) => console.log(error));
  }, []);

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  function handleEdit(event) {
    const memeIndex = event.target.dataset.index
    const meme = listMemes[memeIndex]
    setMeme(meme)
    setListMemes((prevMemes) =>{
      
      return listMemes.filter((value, idx) => {
        console.log(idx != memeIndex)
        return idx != memeIndex
      })
    })
  }

  function savedList(event) {
    event.preventDefault();
    setListMemes((prevListMemes) => {
      return [...prevListMemes, meme];
    });
    setMeme({
      topText: "",
      bottomText: "",
      randomImage: "http://i.imgflip.com/1bij.jpg",
    });
  }
  console.log(listMemes)

  const displayMemes = listMemes.map((meme, index) => (
 <div className="meme-list" key={index}>
        <img src={meme.randomImage} className="meme-list-image" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>  
        <button className="edit-button" data-index={index} onClick={handleEdit} >Edit</button>
      </div>))



  return (
    <main>
      <div className="form">
        <input
          type="text"
          placeholder="Top text"
          className="form--input"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Bottom text"
          className="form--input"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        />
        <button className="form--button" onClick={getMemeImage}>
          Get a new meme image 🖼
        </button>
        <button className="save-button" onClick={savedList}>Save meme</button>
      </div>
      <div className="meme">
        <img src={meme.randomImage} className="meme--image" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>  
      </div>
      <div className="memes-container">{displayMemes}</div>
    
    </main>
  );
}

export default Meme