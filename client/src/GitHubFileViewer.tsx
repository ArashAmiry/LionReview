import React, { useState, useEffect, useRef } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; // Import the desired style
import axios from 'axios';


interface GitHubFileViewerProps {
    owner: string;
    repo: string;
    path: string;
}

function GitHubFileViewer({ owner, repo, path }: GitHubFileViewerProps) {
    const [fileContent, setFileContent] = useState<string>('');

    useEffect(() => {
        async function fetchGitHubFile() {
            try {
                const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
                    headers: {
                        'Accept': 'application/vnd.github.v3.raw'
                    }
                });
                const data = response.data;
                // GitHub API returns the content base64 encoded
                const content = atob(data.content);
                setFileContent(content);
            } catch (error) {
                console.error('Error fetching GitHub file:', error);
            }
        }

        fetchGitHubFile();
    }, [owner, repo, path]);

    useEffect(() => {
        if (fileContent) {
            hljs.highlightAll()
        }
    }, [fileContent]);

    return (
        <pre>
            <code >
                {fileContent}
            </code>
        </pre>
    );
}

export default GitHubFileViewer;
