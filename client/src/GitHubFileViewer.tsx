import React, { useState, useEffect, useRef } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-light.css'; // Import the desired style
import axios from 'axios';


interface GitHubFileViewerProps {
    owner: string;
    repo: string;
    path: string;
}

function GitHubFileViewer({ owner, repo, path }: GitHubFileViewerProps) {
    const [fileContent, setFileContent] = useState<string>('');
  const codeRef = useRef<HTMLElement>(null);

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
    // Apply syntax highlighting when fileContent changes and codeRef is available
    if (fileContent && codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, [fileContent]);

  return (
    <pre>
      <code ref={codeRef} >
        {fileContent}
      </code>
    </pre>
  );
}

export default GitHubFileViewer;
