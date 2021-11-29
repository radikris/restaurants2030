using System.Linq;
using System.Threading.Tasks;
using API.Models;
using Microsoft.AspNetCore.Identity;

namespace API.Infrastructure
{
    public static class DbInitializer
    {
        public static async Task Initialize(ApplicationDbContext context, UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            context.Database.EnsureCreated();

            if (context.Restaurants.Any())
                return;

            var restaurants = new Restaurant[]
            {
                new Restaurant{ Name = "Developer Restaurant" }
            };
            foreach (var restaurant in restaurants)
                context.Restaurants.Add(restaurant);
            context.SaveChanges();

            var foodsDrinks = new FoodDrink[]
            {
                new FoodDrink{ Name = "Banan", Price = 34, RestaurantId = 1 },
                new FoodDrink{ Name = "Eper", Price = 134, RestaurantId = 1 },
                new FoodDrink{ Name = "Alma", Price = 334, RestaurantId = 1 },
                new FoodDrink{ Name = "Korte", Price = 344, RestaurantId = 1 },
                new FoodDrink{ Name = "Kivi", Price = 144, RestaurantId = 1 },
                new FoodDrink{ Name = "Citrom", Price = 14, RestaurantId = 1 },
            };
            foreach (var fooddrink in foodsDrinks)
                context.FoodsDrinks.Add(fooddrink);
            context.SaveChanges();

            var orders = new Order[]
            {
                new Order{ RestaurantId = 1, Table = 1, OrderStatusId = OrderStatusId.InProgress, FoodDrinkId = 3 },
                new Order{ RestaurantId = 1, Table = 1, OrderStatusId = OrderStatusId.Served, FoodDrinkId = 4 },
                new Order{ RestaurantId = 1, Table = 2, OrderStatusId = OrderStatusId.InProgress, FoodDrinkId = 1 },
                new Order{ RestaurantId = 1, Table = 2, OrderStatusId = OrderStatusId.Ready, FoodDrinkId = 2 },
                new Order{ RestaurantId = 1, Table = 2, OrderStatusId = OrderStatusId.Served, FoodDrinkId = 6 },
                new Order{ RestaurantId = 1, Table = 3, OrderStatusId = OrderStatusId.Served, FoodDrinkId = 5 },
            };
            foreach (var order in orders)
                context.Orders.Add(order);
            context.SaveChanges();

            var paidOrders = new PaidOrder[]
            {
                new PaidOrder{ RestaurantId = 1, Table = 1,FoodDrinkId = 3, CheckoutMethodId=CheckoutMethodId.Cash },
                new PaidOrder{ RestaurantId = 1, Table = 1,FoodDrinkId = 4 ,CheckoutMethodId=CheckoutMethodId.Cash},
                new PaidOrder{ RestaurantId = 1, Table = 2, FoodDrinkId = 1,CheckoutMethodId=CheckoutMethodId.BankCard },
                new PaidOrder{ RestaurantId = 1, Table = 3, FoodDrinkId = 6,CheckoutMethodId=CheckoutMethodId.Cash },
                new PaidOrder{ RestaurantId = 1, Table = 3, FoodDrinkId = 6,CheckoutMethodId=CheckoutMethodId.BankCard },

            };
            foreach (var paidOrder in paidOrders)
                context.PaidOrders.Add(paidOrder);
            context.SaveChanges();

            var roles = new string[]
            {
                "Admin", "Waiter", "Chef", "Management"
            };
            foreach (var role in roles)
                await roleManager.CreateAsync(new IdentityRole(role));

            var users = new AppUser[]
            {
                    new AppUser{ RestaurantId = 1, Email = "admin@dev.com", UserName = "adminuser" },
            };
            foreach (var user in users)
            {
                await userManager.CreateAsync(user, "adminpass");
                await userManager.AddToRoleAsync(user, "Admin");
            }
        }
    }
}