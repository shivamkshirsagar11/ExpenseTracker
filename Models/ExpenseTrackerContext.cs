using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ExpenseTracker.Models;

namespace ExpenseTracker.Models
{
    public class ExpenseTrackerContext : DbContext
    {

        public DbSet<User> Users { get; set; } = null!;

        public ExpenseTrackerContext()
        {

        }

        public ExpenseTrackerContext(DbContextOptions<ExpenseTrackerContext> options) : base(options)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Data Source=(localdb)\ProjectModels;Initial Catalog=ExpenseTrackerDB;Integrated Security=True;Connect Timeout=30;Encrypt=False;Trust Server Certificate=False;Application Intent=ReadWrite;Multi Subnet Failover=False");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        }

        public DbSet<ExpenseTracker.Models.Expense>? Expense { get; set; }
    }
}
