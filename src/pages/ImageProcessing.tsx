import { useLocation, useNavigate } from "react-router";
import { Box } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { CustomButton } from "../components";

type RecognitionResult = {
    crop_image: string
    text: string
}
export default function ImageProcessing() {
    const location = useLocation();
    const navigate = useNavigate();
    
    const { file } = location.state || {};
    const [currentFile, setCurrentFile] = useState<File>(file);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [result, setResult] = useState<RecognitionResult[]>([]);
    const [loadingDetect, setLoadingDetect] = useState<boolean>(false);  
    const [loadingRecognize, setLoadingRecognize] = useState<boolean>(false); 

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setCurrentFile(file)
            setSelectedImage(URL.createObjectURL(file)); 
            setResult([])
        }
    };
      

    const handleDetect = async () => {
        if (loadingDetect) return; 
        setLoadingDetect(true);         
        const formData = new FormData();
        formData.append("image", currentFile);

        try {
            const res = await axios.post('/api/detect', formData);
            setSelectedImage(`/api/${res.data.image_path}`);
        } catch (err) {
            toast.error("Something went wrong when detecting lincense plate!");
            setLoadingDetect(false);
        } finally {
            setLoadingDetect(false);
        }
    } 

    const handleRecognize = async () => {
        setResult([]);
        if (loadingRecognize) return;  
        setLoadingRecognize(true);          
        try {
            const formData = new FormData();
            formData.append('image', currentFile);
            const res = await axios.post('/api/recognize', formData);
            if (res?.data?.results) {
                setResult(res.data.results);
            } else {
                toast.error("No results received from the server!");
            }
        } catch (err) {
            toast.error("Something went wrong when recognizing lincense plate!");
            setLoadingRecognize(false);
        } finally {
            setLoadingRecognize(false);
        }
    }

    return (
        <div style={{ display: 'flex' }}>
            <button 
                onClick={() => navigate('/')} 
                style={{margin: '10px', padding: '2px 6px', height: '30px', display: 'flex', alignItems: 'center', borderRadius: '5px',
                        backgroundColor: '#fff', border: '2px solid #0097a7', boxShadow: '2px 5px 9px #78909c', cursor: 'pointer' }}
            >
                <img src="./src/assets/go_back.svg" width={20}></img>
                <span style={{fontSize: '20px', color: '#0097a7'}}>Back Home</span>
            </button>
            <Box sx={{ textAlign: 'center', p: 5 }}>
                <Box sx={{ height: 400, width: 400, mb: 3, boxShadow: '2px 5px 9px #78909c', borderRadius: '10px' }}>
                    {file && (
                        <img
                            src={selectedImage ? selectedImage : URL.createObjectURL(file)}
                            alt="resutImage"
                            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '10px' }}
                        />
                    )}
                </Box>
            </Box>
            <Box sx={{ textAlign: 'center', p: 5 }}>
                <CustomButton onInputChange={handleFileChange}>
                    Upload image
                </CustomButton>
                <CustomButton startIcon={undefined} inputType="text" onClick={handleDetect} disabled={loadingDetect}>
                    {loadingDetect ? "Detecting..." : "Detect"}
                </CustomButton>
                <CustomButton startIcon={undefined} inputType="text" onClick={handleRecognize} disabled={loadingRecognize}>
                    {loadingRecognize ? "Recognizing..." : "Recognize"}
                </CustomButton>
                <Box sx={{ height: 100, width: 300, border: '1px solid #cdcdcd', borderRadius: '5px', textAlign: 'center', marginTop: '50px', boxShadow: '2px 5px 9px #78909c'}}>
                    <div 
                        style={{ background: '#e0e0e0', padding: '6px', color: '#007d91', width: '60%', margin: 'auto', marginTop: '-20px', marginBottom: '-10px', borderRadius: '5px'}}
                    >
                        License Plate Number
                    </div>
                    {result && result.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            {result.map((content, i) => (
                               <div key={i}>
                                    <div style={{padding: '20px'}}>
                                    {content.text ? (
                                    content.text.trim().split('\n').map((line, index) => (
                                        <div style={{ display: 'flex', flexDirection: 'row' }} key={index}>{line}</div>
                                    ))
                                        ) : (
                                            <p>Undefined</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        ) : (
                            <p>No results to display</p>
                    )}
                </Box>
            </Box>
        </div>
    );
}
