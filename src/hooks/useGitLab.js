import { useState } from 'react';
import gitlab from '../api/gitlab';

const useGitLab = () => {

    const [results, setResults] = useState();

    async function searchProjects() {
        const response = await gitlab.get("/projects", {
            params: {
                owned: true,
                simple: true,
            },
        });
        setResults(response.data);
    }

    return ([results, searchProjects]);
    
}

export default useGitLab;