using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GitHubSearch.Models
{
    public class SearchResultModel
    {
        public List<Bookmark> Items { get; set; }

        public SearchResultModel()
        {
            Items = new List<Bookmark>();
        }
    }
}