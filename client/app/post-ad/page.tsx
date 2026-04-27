'use client'; // 👈 CRITICAL: Next.js needs this for interactive forms

import React, { useState } from 'react';

const PostAd = () => {
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        location: '',
        category: 'Hotel',
        description: ''
    });
    const [image, setImage] = useState<File | null>(null); // Added TS type if needed
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!image) return alert("Please select an image");
        
        setLoading(true);

        try {
            // STEP A: Upload the image to Cloudinary
            const data = new FormData();
            data.append("file", image);
            data.append("upload_preset", "rently upload"); 
            data.append("cloud_name", "dgvsmgvpz"); 

            // Updated this URL with your actual cloud name "dgvsmgvpz"
            const cloudinaryRes = await fetch(
                "https://api.cloudinary.com/v1_1/dgvsmgvpz/image/upload",
                { method: "POST", body: data }
            );
            
            const imageData = await cloudinaryRes.json();
            const imageUrl = imageData.secure_url;

            // STEP B: Send data to your Node.js Server
            const finalData = {
                ...formData,
                imageUrl: imageUrl 
            };

            const response = await fetch('${process.env.NEXT_PUBLIC_API_URL}/api/properties', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(finalData)
            });

            if (response.ok) {
                alert("✅ Property Posted Successfully!");
                setFormData({ title: '', price: '', location: '', category: 'Hotel', description: '' });
                setImage(null);
            } else {
                alert("❌ Failed to save to database.");
            }
        } catch (error) {
            console.error("Error posting ad:", error);
            alert("❌ Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto', background: 'white', borderRadius: '8px' }}>
            <h2 style={{ marginBottom: '20px' }}>Post a New Property</h2>
            <form onSubmit={handleSubmit}>
                <input style={{ width: '100%', padding: '8px' }} type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required /><br /><br />
                <input style={{ width: '100%', padding: '8px' }} type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required /><br /><br />
                <input style={{ width: '100%', padding: '8px' }} type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required /><br /><br />
                
                <select style={{ width: '100%', padding: '8px' }} name="category" value={formData.category} onChange={handleChange}>
                    <option value="">Select Category</option>
                    <option value="Hotel">Hotel</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="PG">PG</option>
                </select><br /><br />

                <textarea style={{ width: '100%', padding: '8px' }} name="description" placeholder="Description" value={formData.description} onChange={handleChange}></textarea><br /><br />
                
                <label>Upload Property Photo:</label><br />
                <input type="file" onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} required /><br /><br />

                <button 
                    type="submit" 
                    disabled={loading}
                    style={{ 
                        width: '100%', 
                        padding: '10px', 
                        backgroundColor: loading ? '#ccc' : '#0070f3', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '5px',
                        cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                >
                    {loading ? "Posting to Database..." : "Post Ad Now"}
                </button>
            </form>
        </div>
    );
};

export default PostAd;