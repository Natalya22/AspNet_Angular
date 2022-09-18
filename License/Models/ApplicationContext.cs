using Microsoft.EntityFrameworkCore;

namespace License.Models
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
        public DbSet<License> Licenses { get; set; }
    }
}
