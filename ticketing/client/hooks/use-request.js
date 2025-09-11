import axios from "axios";
import { useState } from "react";

// this is a custom hook to make HTTP requests and handle errors
// it takes an object with url, method, and body as parameters
// it returns a function to make the request and any errors that occur
export const useRequest = ({ url, method, body, onSuccess }) => {
    const [errors, setErrors] = useState(null);

    const doRequest = async () => {
        try {
            setErrors(null);
            const response = await axios[method](url, body);
            if (onSuccess) {
                onSuccess(response.data);
            }
            return response.data;
        }
        catch (err) {
            setErrors(
                <div className="alert alert-danger mt-3">
                    <ul className="my-0">
                        {err.response.data.errors.map((error, index) => (
                            <li key={index}>{error.message}</li>
                        ))}
                    </ul>
                </div>
            );
        }
    };

    return { doRequest, errors };
};