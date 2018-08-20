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
            //ViewBag.Title = "Home Page";

            return View();
        }

        public ActionResult SearchGitHubResult(string search)
        {

            SearchResultModel result = new SearchResultModel();
            string uri = $"https://api.github.com/search/repositories?q={search}";
            IGitHubSearch service = new GitHubService();
            GithubJsonObject searchJsonResult = service.SearchGitHubResult(uri);
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
