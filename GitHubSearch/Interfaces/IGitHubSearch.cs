using GitHubSearch.Models;

namespace GitHubSearch.Interfaces
{
    interface IGitHubSearch
    {
        SearchResultModel SearchGitHubResult(string searchUri);
    }
}
