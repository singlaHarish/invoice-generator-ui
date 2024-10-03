import React from "react"

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <h3>SkyLine Invoice Generator</h3>
            </div>
            <nav className="menu">
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">Generate Invoice</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header