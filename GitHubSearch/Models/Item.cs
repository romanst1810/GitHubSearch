﻿namespace GitHubSearch.Models
{
    public class Item
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Full_Name { get; set; }
        public Owner Owner { get; set; }

        public Item()
        {
            Owner = new Owner();
        }
    }
}