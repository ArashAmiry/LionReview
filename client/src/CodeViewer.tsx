import React, { useState, useEffect } from 'react';
import axios from 'axios';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; // or another style of your choice

const CodeViewer = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCode = async () => {
      try {
        const url = `https://api.github.com/repos/arashamiry/smasko/contents/client/src/App.tsx`;
        const response = await axios.get(url, {
          headers: {
            'Accept': 'application/vnd.github.v3.raw',
          },
        });

        setCode(response.data);

      } catch (error) {
        console.error('Error fetching file content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCode();
  }, []);

  useEffect(() => {
    // Highlight code when the 'code' state updates
    if(code){
      document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block as HTMLElement);
      });
    }
    
  }, [code]); // This will trigger re-highlighting when 'code' changes

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <pre>
      <code>{code}</code>
    </pre>
  );
};

export default CodeViewer;