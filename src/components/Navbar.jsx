const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 w-full bg-black/30 backdrop-blur-md z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                <img src='/NavbarLogo.png' alt="Logo" className="h-10" />
                <ul className="flex space-x-6 text-white font-medium">
                    <li>
                        <a href="#about" className="hover:text-blue-300 transition duration-300">About</a>
                    </li>
                    <li>
                        <a href="#contact" className="hover:text-blue-300 transition duration-300">Contact</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
