import React, { ReactNode } from "react"
import Footer from "./Footer"
import Header from "./Header"

interface LayoutProps {
    children: ReactNode; // Define the type for children
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="layout">
            <Header />
            <main className="content">
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout