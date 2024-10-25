import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    //Handle file selection
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Handle from submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage(response.data.message);
            console.log(response.data.file);
            setFile(null); // Clear the file state after successful upload
            e.target.reset(); // Reset the form, including the file input field
        } catch (error) {
            setMessage('File upload failed');
        }
    };

    return (
        <div>
            <h2>Upload File</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type='submit'>Upload</button>
            </form>
            {message && <p>{ message }</p>}
        </div>
    );
};

export default FileUpload;