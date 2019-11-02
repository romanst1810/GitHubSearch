using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using GitHubSearch.Interfaces;
using GitHubSearch.Models;

namespace GitHubSearch.Services
{
    public class BookmarkService : IBookmark
    {
        public void SetBookmark(Bookmark requestBookmark)
        {
            List<Bookmark> sessionBookmarks = HttpContext.Current.Session["Bookmarks"] as List<Bookmark>;
            if (sessionBookmarks == null)
            {
                sessionBookmarks = new List<Bookmark>();
            }
            sessionBookmarks.Add(requestBookmark);
            HttpContext.Current.Session["Bookmarks"] = sessionBookmarks;
        }

        public IEnumerable<Bookmark> GetBookmarkList()
        {
            List<Bookmark> bookmarks =
                HttpContext.Current.Session["Bookmarks"] as List<Bookmark> ?? new List<Bookmark>();
            return bookmarks;
        }
    }
}