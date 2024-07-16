import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import urlConfig from '../../config.js';
import { useNavigate } from 'react-router-dom';

function PostGift() {
    const navigate = useNavigate();
    useEffect(()=>{ const authToken = sessionStorage.getItem('authToken')
        if(!authToken){
            navigate("/login");
        }
    },[]);
   
    const generateProductId = () => {
        return Math.floor(100 + Math.random() * 900).toString(); // Generates a random three-digit number
    };
    const email = sessionStorage.getItem('email');
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        id: generateProductId(),
        name: '',
        category: 'Living',
        condition: 'New',
        posted_by: email,
        zipcode: '',
        date_added: Math.floor(Date.now() / 1000), // Unix timestamp in seconds
        age_days: '',
        age_years: '',
        description: '',
        image: null
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setFormData({
                ...formData,
                image: files[0]
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const imgBBApiKey = process.env.REACT_APP_IMGBB_API_KEY;
        const imgBBUrl = `https://api.imgbb.com/1/upload?key=${imgBBApiKey}`;

        const imageFormData = new FormData();
        imageFormData.append('image', formData.image);

        try {
            // Upload image to ImgBB
            const imgBBResponse = await axios.post(imgBBUrl, imageFormData);
            const imageUrl = imgBBResponse.data.data.url;

            // Prepare data for backend submission
            const data = {
                ...formData,
                image: imageUrl
            };

            // Post data to your backend
            const backendResponse = await axios.post(`${urlConfig.backend_url}/gifts`, data);

            if (backendResponse) {
                console.log(backendResponse.data);
                toast.success('Gift posted successfully');
                
                // Handle success (e.g., clear the form)
                setFormData({
                    id: generateProductId(),
                    name: '',
                    category: 'Living',
                    condition: 'New',
                    posted_by: email,
                    zipcode: '',
                    date_added: Math.floor(Date.now() / 1000), // Unix timestamp in seconds
                    age_days: '',
                    age_years: '',
                    description: '',
                    image: null
                });

                // Reset the file input
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            } else {
                console.error('Failed to post gift');
                toast.error('Failed to post gift');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred while posting the gift');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Add New Gift</h2>
            <form id="giftForm" onSubmit={handleSubmit} encType="multipart/form-data">

                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category</label>
                    <select className="form-select" id="category" name="category" value={formData.category} onChange={handleChange} required>
                        <option value="Living">Living</option>
                        <option value="Bedroom">Bedroom</option>
                        <option value="Kitchen">Kitchen</option>
                        <option value="Office">Office</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="condition" className="form-label">Condition</label>
                    <select className="form-select" id="condition" name="condition" value={formData.condition} onChange={handleChange} required>
                        <option value="New">New</option>
                        <option value="Like New">Like New</option>
                        <option value="Older">Older</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="posted_by" className="form-label">Posted By</label>
                    <input type="email" className="form-control" id="postedBy" name="posted_by" value={formData.posted_by} onChange={handleChange} disabled />
                </div>

                <div className="mb-3">
                    <label htmlFor="zipcode" className="form-label">Zipcode</label>
                    <input type="text" className="form-control" id="zipcode" name="zipcode" value={formData.zipcode} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="age_years" className="form-label">Age (Years)</label>
                    <input className="form-control" type="number" min="0" id="age_years" name="age_years" value={formData.age_years} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="age_days" className="form-label">Age (Days)</label>
                    <input className="form-control" type="number" min="1" id="age_days" name="age_days" value={formData.age_days} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" name="description" rows="3" value={formData.description} onChange={handleChange} required></textarea>
                </div>

                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image</label>
                    <input type="file" className="form-control" id="image" name="image" accept="image/*" onChange={handleChange} required ref={fileInputRef} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>

            </form>
            <ToastContainer />
        </div>
    );
}

export default PostGift;
