import axios from "axios";
import { useState } from "react";

export const useRequest = ({ url, method, body }) => {
    const [errors, setErrors] = useState(null);

    const doRequest = async () => {
        try {
            setErrors(null);
            const response = await axios[method](url, body);
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