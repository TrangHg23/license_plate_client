import React, { useState } from 'react';
import CustomButton from '../CustomButton';
import { Box } from '@mui/material';

type UploadProps = {
    onImageSelect: (image: File) => void
}

const UploadComponent = ({onImageSelect}: UploadProps) => {
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

    const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        if (file) {
            setImagePreviewUrl(URL.createObjectURL(file));
            onImageSelect(file)
        }
    };
    return (
        <Box sx={{ textAlign: 'center' }}>
            <CustomButton accept="image/*" onInputChange={handleChangeFile}>
                Upload image
            </CustomButton>
            <Box sx={{ p: 2, border: 'solid none', height: 300, width: 400, m:5, mt: 2, background:'#cdcdcd'}}>
                {imagePreviewUrl && (
                    <img
                        src={imagePreviewUrl}
                        alt="Uploaded Preview"
                        style={{  maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}}
                    />
                )}
            </Box>
        </Box>
    );
};

export default UploadComponent;
