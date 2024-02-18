import { GithubRepository } from "./GithubRepository";

test("If a GitHub path is sent then it should be parsed correctly", async () => {
    const repositoryService = new GithubRepository();
    const githubUrl = "https://github.com/ArashAmiry/Smasko/blob/mockup/server/src/service/recipe.test.ts";

    const parsedUrl = repositoryService.parseGithubURL(githubUrl);

    const expectedParsedUrl = {
        "owner": "arashamiry",
        "repo": "smasko",
        "path": "server/src/service/recipe.test.ts",
        "branch": "mockup"
    };

    expect(expectedParsedUrl.branch.toLowerCase()).toEqual(parsedUrl.branch.toLowerCase());
    expect(expectedParsedUrl.owner.toLowerCase()).toEqual(parsedUrl.owner.toLowerCase());
    expect(expectedParsedUrl.path.toLowerCase()).toEqual(parsedUrl.path.toLowerCase());
    expect(expectedParsedUrl.repo.toLowerCase()).toEqual(parsedUrl.repo.toLowerCase());
})