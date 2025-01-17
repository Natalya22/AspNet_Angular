﻿using Microsoft.EntityFrameworkCore;

namespace License.Models
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
        }
        public DbSet<License> Licenses { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
