import axios from 'axios';
import { useEffect, useState } from 'react';
import { BACKEND_URL } from '../config';

export function useContent() {
	const [contents, setContents] = useState([]);

    function refresh() {
        axios
            .get(`${BACKEND_URL}/api/v1/content`, {
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
            })
            .then((response) => {
                setContents(response.data.userContent);
            });
    }
	useEffect(() => {
        refresh()
		let interval = setInterval(() => {
            refresh()
        }, 5000);

        return () => {
            clearInterval(interval)
        }
	}, []);

	return {contents, refresh};
}
