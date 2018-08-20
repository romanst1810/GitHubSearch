using GitHubSearch.Models;

namespace GitHubSearch.Interfaces
{
    interface IGitHubSearch
    {
        GithubJsonObject SearchGitHubResult(string searchUri);
    }
}
