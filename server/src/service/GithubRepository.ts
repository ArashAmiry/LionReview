import axios from 'axios';

export class GithubRepository {

    async fetchCode(path: string): Promise<string> {
        const parsedUrl = this.parseGithubURL(path);
        const url = `https://api.github.com/repos/${parsedUrl.owner}/${parsedUrl.repo}/contents/${parsedUrl.path}/?ref=${parsedUrl.branch}`;
        
        const response = await axios.get(url, {
            headers: {
                'Accept': 'application/vnd.github.v3.raw',
            },
        });

        return JSON.parse(JSON.stringify(response.data));
    }

    parseGithubURL(githubUrl: string) {
        const url = new URL(githubUrl);

        if (url.hostname !== 'github.com') {
            throw new Error('URL is not a valid GitHub URL');
        }

        const pathSegments = url.pathname.split('/').filter(Boolean);

        if (pathSegments.length < 3) {
            throw new Error('URL does not contain a valid path to a file or directory');
        }

        const owner = pathSegments[0];
        const repo = pathSegments[1];
        const path = pathSegments.slice(4).join('/');
        const branch = pathSegments[3];

        return { owner, repo, path, branch };
    }
}