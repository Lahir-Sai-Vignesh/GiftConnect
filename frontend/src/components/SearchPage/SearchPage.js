import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import urlConfig from '../../config';
import axios from 'axios';

function SearchPage() {
    const conditions = ["New", "LikeNew", "Older"];
    const categories = ["Living", "BedRoom", "Kitchen", "Office"];
    const [ageRange, setAgeRange] = useState(5); // default value: 5
    const [query, setQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [conditionFilter, setConditionFilter] = useState('');
    const [results, setResults] = useState([]);
    const [searchPerformed, setSearchPerformed] = useState(false);
    const navigate = useNavigate();


    const handleSearch = async () => {
        const baseUrl = `${urlConfig.backend_url}/search?`;
        
        const queryParams = new URLSearchParams({
            name: query,
            age_years: ageRange,
            category: categoryFilter,
            condition: conditionFilter
        }).toString();

        try {
            const response = await axios.get(`${baseUrl}${queryParams}`);
            let data = response.data;
            setResults(data);

        } catch (err) {
            console.error('Failed to fetch search results:', err);
        }
        setSearchPerformed(true);

    };

    const goToDetailsPage = (productId) => {
        navigate(`/product/${productId}`);
    };

    return (
        <div className="container">
            <div className="row">
                <div className='col-md-6'>
                    <div className="mb-3 p-3 border rounded">
                        <h5>Filters</h5>
                        <div className="d-flex flex-column">
                            {/* Category Filter */}
                            <label htmlFor="categoryFilter">Category</label>
                            <select
                                className="form-control my-1"
                                id="categoryFilter"
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                            >
                                <option value="">All</option>
                                {categories.map((category, ind) => (
                                    <option key={ind} value={category}>{category}</option>
                                ))}
                            </select>

                            {/* Condition Filter */}
                            <label htmlFor="conditionFilter">Condition</label>
                            <select
                                id="conditionFilter"
                                className="form-control my-1"
                                value={conditionFilter}
                                onChange={(e) => setConditionFilter(e.target.value)}
                            >
                                <option value="">All</option>
                                {conditions.map(condition => (
                                    <option key={condition} value={condition}>{condition}</option>
                                ))}
                            </select>

                            {/* Age Filter */}
                            <label htmlFor="ageFilter">Less than {ageRange} years</label>
                            <input
                                type="range"
                                className="form-control-range"
                                id="ageFilter"
                                min="1"
                                max="10"
                                value={ageRange}
                                onChange={e => setAgeRange(e.target.value)}
                            />
                        </div>
                    </div>

                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Search"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                    <button className="btn btn-primary" onClick={handleSearch}>Search</button>

                    <div className="search-results mt-4">
                    {!searchPerformed ? null : (
                            results.length > 0 ? (
                                results.map(product => (
                                    <div key={product.id} className="card mb-3">
                                        {/* Check if product has an image and display it */}
                                        <img src={product.image} alt={product.name} className="card-img-top" />
                                        <div className="card-body">
                                            <h5 className="card-title">{product.name}</h5>
                                            <p className="card-text">{product.description.slice(0, 100)}...</p>
                                        </div>
                                        <div className="card-footer">
                                            <button onClick={() => goToDetailsPage(product.id)} className="btn btn-primary">
                                                View More
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="alert alert-info" role="alert">
                                    No products found. Please revise your filters.
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchPage;
