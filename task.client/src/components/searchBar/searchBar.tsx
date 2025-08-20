import { useState } from 'react';
import './searchBar.css'

function SearchBar({onSearch}) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            onSearch(searchTerm);
        }
    };

    return (
        <div className="search-container">
            <form className="search-bar" onSubmit={handleSubmit}>
                <input 
                    type="search" 
                    name="search" 
                    pattern=".*\S.*" 
                    required 
                    placeholder="Enter tracking number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="search-btn" type="submit">
                    <span>Search</span>
                </button>
            </form>
        </div>
    );
}

export default SearchBar;