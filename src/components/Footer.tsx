import React from "react"


const Footer = () => {
   return (
    <footer className="bg-dark text-white mt-5 p-3 text-center">
        <p>&copy; {new Date().getFullYear()} SkyLine Invoice Generator. All rights reserved.</p>
    </footer>
   ) 
}

export default Footer