using System;
using System.Linq;
using API.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Infrastructure
{
    public class ApplicationDbContext : IdentityDbContext<AppUser>
    {
        public DbSet<Restaurant> Restaurants { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderStatus> OrderStatuses { get; set; }
        public DbSet<FoodDrink> FoodsDrinks { get; set; }
        public DbSet<PaidOrder> PaidOrders { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Order>()
                .Property(p => p.OrderStatusId)
                .HasConversion<int>();

            modelBuilder.Entity<OrderStatus>()
                .Property(p => p.OrderStatusId)
                .HasConversion<int>();

            modelBuilder.Entity<OrderStatus>()
                .HasData(
                    Enum.GetValues(typeof(OrderStatusId))
                        .Cast<OrderStatusId>()
                        .Select(x => new OrderStatus() { OrderStatusId = x, Name = x.ToString() })
                );


            modelBuilder.Entity<PaidOrder>()
                .Property(p => p.CheckoutMethodId)
                .HasConversion<int>();

            modelBuilder.Entity<CheckoutMethod>()
                .Property(p => p.CheckoutMethodId)
                .HasConversion<int>();

            modelBuilder.Entity<CheckoutMethod>()
                .HasData(
                    Enum.GetValues(typeof(CheckoutMethodId))
                        .Cast<CheckoutMethodId>()
                        .Select(x => new CheckoutMethod() { CheckoutMethodId = x, Name = x.ToString() })
                );
        }
    }
}