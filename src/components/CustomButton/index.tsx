import { Button } from "@mui/material"
import { ButtonProps } from "@mui/material"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface CustomButtonProps extends ButtonProps {
    icon?: React.ReactNode;
    inputType?: "file" | "text";
    accept?: string;
    onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onButtonClick?: () => void;
}
const CustomButton = ({icon=<CloudUploadIcon/>, inputType="file", accept, onInputChange, onButtonClick, children, ...rest}: CustomButtonProps) => {
    return (
        <div>

            <Button
                component='label'
                variant="contained" 
                startIcon={icon}  
                {...rest} 
                sx={{margin: 2, background: '#0097a7'}}        
            >
                {children}  

                {inputType === "file" && (
                    <input
                        type="file"
                        hidden
                        accept={accept} 
                        onChange={onInputChange} 
                    /> 
                )}
    
                {inputType === "text" && (
                    <button type="button" style={{ display: 'none' }} onClick={onButtonClick} />
                )}
            </Button> 
        </div>
    )
}

export default CustomButton