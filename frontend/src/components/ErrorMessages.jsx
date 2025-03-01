import { Alert } from "react-bootstrap";

const ErrorMessages = ({ variant = "info", children }) => {
    return (
        <Alert variant={variant} style={{ fontSize: 20 }}>
            <strong>{children}</strong>
        </Alert>
    );
};

export default ErrorMessages;