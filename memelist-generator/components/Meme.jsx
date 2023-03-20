import React, { useState, useEffect } from "react";

function Meme() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });
  const [allMemes, setAllMemes] = useState([]);
  const [listMemes, setListMemes] = useState([])
 

 

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
      // console.log(meme)
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
        <img src={meme.randomImage} className="meme--image" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>  
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
        {/* <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>   */}
      </div>
      <div className="memes-container">{displayMemes}</div>
    
    </main>
  );
}

export default Meme