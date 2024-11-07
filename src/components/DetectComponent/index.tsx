import { useState } from "react";
import CustomButton from "../CustomButton"
import axios from "axios";
import { Box } from "@mui/material";

interface DetectProps {
    image: File | null;
}

const DetectComponent = ({image}: DetectProps) => {
    const [detectedImage, setDetectedImage] = useState<string | null>(null);

    const handleDetect = async () => {
        if(!image) {
            alert("Bạn chưa tải ảnh lên!")
            return;
        }

        const formData = new FormData();
        formData.append("image", image)

        try {
            const res = await axios.post('/api/detect', formData);
            setDetectedImage(`/api/${res.data.image_path}`);
        } catch(err) {
            console.log("Có lỗi xảy ra khi phát hiện biển số xe!")
        }
        
    }
    
    return (
        <Box sx={{ textAlign: 'center' }}>
            <CustomButton startIcon={undefined} inputType="text" onClick={handleDetect}>
                Detect By Yolov8
            </CustomButton>

            <Box sx={{ p: 2, height: 300, width: 400, m: 5, mt: 2, background:'#cdcdcd' }}>
                {detectedImage && (
                    <img
                        src={detectedImage} 
                        alt="Detected" 
                        style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}}
                    />
                )}
            </Box>
        </Box>
    )
}

export default DetectComponent