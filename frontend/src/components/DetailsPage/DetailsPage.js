import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import urlConfig from '../../config';
import './DetailsPage.css'
function DetailsPage({ editingMode }) {
    const { productId } = useParams();
    const [gift, setGift] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const authToken = sessionStorage.getItem('authToken')
        if (!authToken) {
            navigate("/login");
        }
        const fetchGift = async () => {
            try {
                const url = `${urlConfig.backend_url}/gifts/id/${productId}`;
                const response = await axios.get(url);
                setGift(response.data);
                setLoading(false);
            } catch (error) {
                //console.error(error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchGift();
    }, [productId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading gift details.</p>;
    if (!gift) return <div>Gift not found</div>;

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' });
    };

    function goToEditPage() {
        navigate(`/profile/edit/product/editpost/${productId}`);
    }
    async function postDelete() {
        try {
            const url = `${urlConfig.backend_url}/gifts/id/${productId}`;
            const response = await axios.delete(url);
            navigate(-1)
            console.log(response.data);
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className="container mt-5">
            <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>Back</button>
            {editingMode ? (<>
                <button className="btn btn-success mb-3" onClick={goToEditPage}>Edit</button>
                <button className="btn btn-danger mb-3" onClick={postDelete}>Delete</button>
            </>) : ''}
            <div className="card product-details-card">
                <div className="card-header text-white">
                    <h2 className="details-title">{gift.name}</h2>
                </div>
                <div className="card-body">
                    <div className="image-placeholder-large">
                        {gift.image ? (
                            <img src={gift.image} alt={gift.name} className="product-image-large" />
                        ) : (
                            <div className="no-image-available-large">No Image Available</div>
                        )}
                    </div>

                    <p><strong>Category:</strong>
                        {gift.category}
                    </p>
                    <p><strong>Condition:</strong>
                        {gift.condition}
                    </p>
                    <p><strong>Date Added:</strong>
                        {formatDate(gift.date_added)}
                    </p>
                    <p><strong>Age (Years):</strong>
                        {gift.age_years}
                    </p>
                    <p><strong>Description:</strong>
                        {gift.description}
                    </p>
                    <p><strong>Contact:</strong>
                        {gift.posted_by}
                    </p>
                </div>
            </div>

        </div>
    );
}

export default DetailsPage;
