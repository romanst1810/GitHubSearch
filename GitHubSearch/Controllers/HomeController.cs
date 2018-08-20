using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using GitHubSearch.Interfaces;
using GitHubSearch.Models;
using GitHubSearch.Services;

namespace GitHubSearch.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult SearchGitHubResult(string search)
        {

            SearchResultModel result = new SearchResultModel();
            IGitHubSearch service = new GitHubService();
            GithubJsonObject searchJsonResult = service.SearchGitHubResult(search);
            foreach (var jres in searchJsonResult.Items)
            {
                Bookmark bm = new Bookmark
                {
                    Name = jres.Name,
                    Avatar = jres.Owner.Avatar_Url
                };
                result.Items.Add(bm);
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetBookmarks()
        {
            IBookmark service = new BookmarkService();
            List<Bookmark> result = service.GetBookmarkList().ToList();
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public void SetBookmark(string name, string avatar)
        {
            IBookmark service = new BookmarkService();
            Bookmark newBookmark = new Bookmark() {Name = name,Avatar = avatar};
            service.SetBookmark(newBookmark);
        }
    }
}
