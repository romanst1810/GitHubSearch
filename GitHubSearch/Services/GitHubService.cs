using System.IO;
using System.Net;
using System.Threading.Tasks;
using System.Web.Script.Serialization;
using GitHubSearch.Interfaces;
using GitHubSearch.Models;

namespace GitHubSearch.Services
{
    public class GitHubService : IGitHubSearch
    {
        public GithubJsonObject SearchGitHubResult(string searchUri)
        {
            var jsonData = GetResponseFromUri(searchUri);
            JavaScriptSerializer js = new JavaScriptSerializer();
            GithubJsonObject githubJsonObject = js.Deserialize<GithubJsonObject>(jsonData);
            return githubJsonObject;
        }

        string GetResponseFromUri(string uri)
        {
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(uri);

            request.UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36";

            //        var webClient = new WebClient();

            //    webClient.Headers.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36");

            //    var s = webClient.DownloadString("https://api.github.com/search/repositories?q=tetris+language:assembly&sort=stars&order=desc");


            // request.AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate;

            using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
            using (Stream stream = response.GetResponseStream())
                if (stream != null)
                {
                    using (StreamReader reader = new StreamReader(stream))
                    {
                        return reader.ReadToEnd();
                    }
                }
            return null;
        }

        async Task<string> GetAsync(string uri)
        {
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(uri);
            request.AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate;

            using (HttpWebResponse response = (HttpWebResponse)await request.GetResponseAsync())
            using (Stream stream = response.GetResponseStream())
            using (StreamReader reader = new StreamReader(stream))
            {
                return await reader.ReadToEndAsync();
            }
        }
    }
}