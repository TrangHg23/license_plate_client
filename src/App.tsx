import { useState } from "react";
import { DetectComponent, UploadComponent } from "./components";

function App() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  return (
    <div style={{background: '#fff', borderRadius: '20px', boxShadow: '5px 10px 18px #78909c'}}>
      <h1>License Plate</h1>
      <div style={{display: 'flex'}}>
        <UploadComponent onImageSelect={setSelectedImage} />
        <DetectComponent image={selectedImage} />
      </div>
    </div>
  );
}

export default App

