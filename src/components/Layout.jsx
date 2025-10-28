import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout() {
    return (
        <div className="d-flex flex-column min-vh-100 bg-light">
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}