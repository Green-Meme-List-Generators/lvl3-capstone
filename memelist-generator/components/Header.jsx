import React from "react"
import trollFace from "../images/troll-face.png"

function Header() {
    return (
        <header className="header">
            <img 
                src={trollFace} 
                className="header--image"
                alt="troll pic"
            />
            <h2 className="header--title">Meme List Generator</h2>
            <h4 className="header--project">Level 3 Capstone</h4>
        </header>
    )
}

export default Header