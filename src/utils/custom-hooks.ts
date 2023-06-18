import { useState } from 'react';

type UseFieldValidator<T> = (value: T) => boolean;

export const useField = <T>(
    initialValue: T,
    validator: UseFieldValidator<T>,
    errorMessage: string
) => {
    const [value, setValue] = useState(initialValue);
    const [error, setError] = useState('');

    const validate = () => {
        const valid = validator(value);
        setError(valid ? '' : errorMessage);
        return valid;
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value as T);
        if (error) {
            setError('');
        }
    };

    return {
        value,
        error,
        handleChange,
        validate,
    };
};
