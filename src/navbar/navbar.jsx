import '../navbar/navbar.css'


export const Navbar = ({handleSearch}) => {


    return (
        <nav className="navbar">
            
            <div className="navbar-logo">MiLogo</div>
            <div className="navbar-search">
                <input type="search" placeholder="Buscar..." className="search-input" 
                onChange={handleSearch} // Añade el manejador de cambio
                
                />
            </div>
            
        </nav>
    );
};

