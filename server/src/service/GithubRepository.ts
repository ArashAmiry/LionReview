import axios, { AxiosResponse } from 'axios';
import GITHUB_TOKEN from '../github_token'

export class GithubRepository {

    async fetchCode(path: string): Promise<string> {
        try {
            const parsedUrl = this.parseGithubURL(path);
            const url = `https://api.github.com/repos/${parsedUrl.owner}/${parsedUrl.repo}/contents/${parsedUrl.path}?ref=${parsedUrl.branch}`;

            const response: AxiosResponse = await axios.get(url, {
                headers: {
                    'Accept': 'application/vnd.github.v3.raw',
                    'Authorization': 'Bearer ' + process.env.GITHUB_TOKEN,
                },
            });

            return JSON.parse(JSON.stringify(response.data));
        } catch (error) {
            console.error('Error fetching code:', error);
            throw new Error('Failed to fetch code from GitHub');
        }
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