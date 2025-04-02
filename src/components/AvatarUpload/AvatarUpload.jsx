import React, { useState } from 'react';

import axios from 'axios';

function AvatarUpload() {
    const [uploading, setUploading] = useState(false);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('avatar', file);

        try {
            const token = localStorage.getItem('token'); // Lấy token xác thực
            const response = await axios.post('/api/upload-avatar', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Link ảnh:', response.data.url);
            // Có thể sử dụng link ảnh để hiển thị hoặc lưu vào state
        } catch (error) {
            console.error('Upload thất bại:', error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <input
                type='file'
                accept='image/*'
                onChange={handleFileChange}
                disabled={uploading}
            />
            {uploading && <p>Đang upload...</p>}
        </div>
    );
}

export default AvatarUpload;
