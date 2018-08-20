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
            List<Bookmark> newBookmarkList = new List<Bookmark>();
            Bookmark bookmark = new Bookmark { Name = requestBookmark.Name, Avatar = requestBookmark.Avatar };

            List<Bookmark> sessionBookmarks = HttpContext.Current.Session["Bookmarks"] as List<Bookmark>;
            if (sessionBookmarks != null)
            {
                newBookmarkList.AddRange(sessionBookmarks);
            }
            newBookmarkList.Add(bookmark);
            HttpContext.Current.Session["Bookmarks"] = newBookmarkList;
        }

        public IEnumerable<Bookmark> GetBookmarkList()
        {
            List<Bookmark> bookmarks =
                HttpContext.Current.Session["Bookmarks"] as List<Bookmark> ?? new List<Bookmark>();
            return bookmarks;
        }
    }
}