import React from 'react';

type Props = {
    title?: string;
};

type TReturn = [Props, (event: React.FormEvent<HTMLInputElement>) => void];

export const useForm = (initialVal: Props): TReturn => {
    const [formData, setFormData] = React.useState(initialVal || {});

    const handleInput = React.useCallback((event: React.FormEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.currentTarget.name]: event.currentTarget.value,
        });
        //eslint-disable-next-line
    }, []);

    return [formData, handleInput];
};

export default useForm;
