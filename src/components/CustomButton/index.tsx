import { Button, ButtonProps } from "@mui/material";

interface CustomButtonProps extends ButtonProps {
    icon?: React.ReactNode;
    inputType?: "file" | "text";
    accept?: string;
    onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onButtonClick?: () => void;
    size?: "small" | "large"; 
}

const CustomButton = ({
    icon = "",
    inputType = "file",
    accept,
    onInputChange,
    onButtonClick,
    size = "small",
    children,
    ...rest
}: CustomButtonProps) => {
    return (
        <div>
            <Button
                component="label"
                variant="contained"
                startIcon={icon}
                {...rest}
                sx={{
                    m: 2,
                    background: "#0097a7",
                    borderRadius: "50px",
                    width: "90%",
                    fontSize: '20px',
                    textTransform: 'capitalize',
                    '&:hover': {
                        opacity: 0.8
                    }
                }}
                size={size} 
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
                    <button type="button" style={{ display: "none" }} onClick={onButtonClick} />
                )}
            </Button>
        </div>
    );
};

export default CustomButton;
