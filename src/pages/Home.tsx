import { useNavigate } from "react-router";
import { Box } from "@mui/material";
import { toast } from "react-toastify";
import { CustomButton } from "../components";

function Home() {
  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
      navigate("/uploaded", { state: {file: selectedFile} }); 
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.indexOf('image') === 0) {
        const file = item.getAsFile();
        if (file) {
          navigate("/uploaded", { state: { file: file } });
        }
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); 
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); 

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        navigate("/uploaded", { state: { file: file } });
      } else {
        toast.warning("Please drop an image file.");
      }
    }
  };
  return (
    <div style={{background: '#fff', borderRadius: '20px', boxShadow: '5px 10px 18px #78909c', width: '480px', minHeight: '480px'}}>
      <Box>
        <h1 style={{ color: "rgb(69, 69, 69)", fontSize: "28px"}}>
            Upload an image to <br/> detect or recognize license plate
        </h1>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <CustomButton size="large" onInputChange={handleFileChange} style={{marginBottom: '40px', marginTop: '-10px'}}>
          Upload image
        </CustomButton>
      </Box>

      <Box
        style={{
          width: '90%',
          borderRadius: '10px',
          margin: 'auto',
          minHeight: '200px',
          border: '2px dashed #ccc',
          textAlign: 'center',
          padding: '20px',
          backgroundColor: '#f9f9f9',
          boxSizing: 'border-box',
        }}
        onPaste={handlePaste}
        onDragOver={handleDragOver} 
        onDrop={handleDrop}
      >
        <img src="./src/assets/upload.svg" width={100}></img>
        <p><span style={{fontSize: '19px'}}>Drag and drop a file, </span><br/> paste image here</p>
      </Box>
    </div>
  );
}

export default Home

