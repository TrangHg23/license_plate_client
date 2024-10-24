import React, { useState } from 'react';
import CustomButton from '../CustomButton';


const UploadComponent = () => {
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

    const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        if (file) {
            setImagePreviewUrl(URL.createObjectURL(file));
        }
    };
    return (
        <div>
            <CustomButton accept="image/*" onInputChange={handleChangeFile}>
                Upload image
            </CustomButton>
            <div>
                {imagePreviewUrl && (
                    <img
                        src={imagePreviewUrl}
                        alt="Uploaded Preview"
                        style={{ marginTop: '16px', maxWidth: '300px', height: 'auto' }}
                    />
                )}
            </div>
        </div>
    );
};

export default UploadComponent;
