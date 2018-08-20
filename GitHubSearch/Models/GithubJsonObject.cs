using System.Collections.Generic;

namespace GitHubSearch.Models
{
    public class GithubJsonObject
    {
        public int Total_Count { get; set; }    
        public List<Item> Items { get; set; }

        public GithubJsonObject()
        {
            Items = new List<Item>();
        }
    }
}