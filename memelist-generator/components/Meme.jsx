import React, { useState, useEffect } from "react";
import axios from "axios"

//sets state with default random image and empty top and bottom text, this is what appears in the preview section

function Meme() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });
  const [allMemes, setAllMemes] = useState([]); //the memes received from the api
  const [listMemes, setListMemes] = useState([]) //the created memes array displayed below the preview page
  
  // useEffect function with axios get request to pull top 100 meme images from api
  useEffect(() => {
    axios
      .get("https://api.imgflip.com/get_memes")
      // .then((response) => console.log(response.data.data.memes))
      .then((response) => setAllMemes(response.data.data.memes))
      .catch((error) => console.log(error));
  }, []);

  //function to pick a random meme from the array of memes saved in state 
  //saves url of random image, sets new meme state variable with old fields, but random image url is updated to the one
  //chosen with the random function

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }


  //handles change to input fields, renders text to preview image while it's typed in
  function handleChange(event) {
    const { name, value } = event.target; //contains the values for name and value, is called every time a new letter is typed
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }
  //handles edit to meme in list when edit button is clicked, pushes the target meme to top (preview) div and jumps 
  //up to the top of the page so you don't have to scroll all the way up.
  function handleEdit(event) {
    const memeIndex = event.target.dataset.index //data-index in jsx is contained in dataset.index here
    
    window.scrollTo(0,0)
    setMeme(listMemes[memeIndex] ) //updates state to the meme whose edit button you clicked, moving it up to the top
    setListMemes(() =>{ //updates state for listMemes
      
      return listMemes.filter((value, idx) => {
        // console.log(idx != memeIndex)
        return idx != memeIndex
      })
    })
  }
  //filters memes saved in the listMemes state, filters out the meme whose delete button was clicked, so that it's no 
  //longer rendered in the list

  function handleDelete(index) {
    // console.log(index)
    setListMemes(listMemes.filter((meme, pos)=> {
      return index !== pos
    }))
  }

  //function to save meme to list below preview, adds the meme to the list memes array saved in state, then empties
  //the input boxes and back to the default photo
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

  //


  //maps over the listMemes array and renders the created memes, along with an edit and delete button

  const displayMemes = listMemes.map((meme, index) => (
 <div className="meme-list" key={index}>
        <img src={meme.randomImage} className="meme-list-image" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>  
        <div id="buttons">
          <button className="edit-button" data-index={index} onClick={handleEdit} >Edit</button>
          {/* handleEdit is called with the event parameter, whereas handleDelete is called by an anonymous function with 
          the index parameter */}
          <button className="delete-btn" onClick={() => handleDelete(index)}>Delete</button>
        </div>
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