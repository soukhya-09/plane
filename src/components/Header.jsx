const Header = () => {
    return (
      <header className="bg-blue-600 text-white flex justify-between items-center p-4 flex-col sm:flex-row">
        <div className="logo text-2xl font-bold mb-4 sm:mb-0">
          <h1>MyLogo</h1>
        </div>
        <nav>
          <ul className="flex space-x-8 mb-4 sm:mb-0">
            <li><a href="/" className="hover:text-blue-300">Home</a></li>
            <li><a href="/" className="hover:text-blue-300">About</a></li>
            <li><a href="/" className="hover:text-blue-300">Services</a></li>
            <li><a href="/" className="hover:text-blue-300">Contact</a></li>
          </ul>
        </nav>
        <div className="search-bar">
         
        </div>
      </header>
    );
  }
  export default Header
  