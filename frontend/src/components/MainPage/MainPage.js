import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import urlConfig from '../../config';

function MainPage() {
    const [gifts, setGifts] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    // fetching gifts on page load
    useEffect(() => {
        const fetchGifts = async () => {
            try {
                const url = `${urlConfig.backend_url}/gifts`;
                const response = await axios.get(url);
                //console.log(response.data);
                setGifts(response.data);
            } catch (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(`HTTP error: ${error.response.status}`);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log('No response received: ' + error.message);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error: ' + error.message);
                }

            } finally {
                setLoading(false);
            }
        };
        fetchGifts();
    }, []);

    function giftConditionClass(cond) {
        return cond === "New" ? "list-group-item-success" : "list-group-item-warning";
    }

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' });
    };

    const goToDetailsPage = (productId) => {
        navigate(`/product/${productId}`);
    };

    return (
        <div className="container mt-5">
            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            ) : (<div className="row">
                {
                    gifts.map((gift, index) => (
                        <div key={index} className="col-md-4 mb-4">
                            <div className="card" style={{ width: '18rem' }}>
                                <div className='image-placeholder'>
                                    {gift.image ? (
                                        <img src={gift.image} className="card-img-top" alt={gift.name} loading="lazy"/>
                                    ) : (
                                        <div className="no-image-available">No Image Available</div>
                                    )}
                                </div>

                                <div className="card-body">
                                    <h5 className="card-title">{gift.name}</h5>
                                    <p className={`card-text ${giftConditionClass(gift.condition)}`}>
                                        {gift.condition}
                                    </p>
                                    <p className="card-text date-added">
                                        {formatDate(gift.date_added)}
                                    </p>
                                </div>
                                <div className="card-footer">
                                    <button onClick={() => goToDetailsPage(gift.id)} className="btn btn-primary w-100">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>)
            }
        </div>
    );
}

export default MainPage;
