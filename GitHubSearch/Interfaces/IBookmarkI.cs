using System.Collections.Generic;
using GitHubSearch.Models;

namespace GitHubSearch.Interfaces
{
    interface IBookmark
    {
        void SetBookmark(Bookmark requestBookmark);
        IEnumerable<Bookmark> GetBookmarkList();
    }
}
