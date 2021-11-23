using API.DTO;
using API.Infrastructure;
using API.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.CQRS.Queries
{
    public class AddNewFoodDrinkQuery : IRequest<FoodDrink>
    {
        public int RestaurantId { get; set; }

        public FoodDrinkDTO NewFoodDrink { get; set; }

        public class AddNewFoodDrinkQueryHandler : IRequestHandler<AddNewFoodDrinkQuery, FoodDrink>
        {
            private readonly ApplicationDbContext _context;

            public AddNewFoodDrinkQueryHandler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<FoodDrink> Handle(AddNewFoodDrinkQuery request, CancellationToken cancellationToken)
            {

                FoodDrink createdFoodDrink = new FoodDrink { Name = request.NewFoodDrink.Name, Price = request.NewFoodDrink.Price, RestaurantId = request.RestaurantId };
                _context.FoodsDrinks.Add(createdFoodDrink);

                await _context.SaveChangesAsync();
                return createdFoodDrink;
            }
        }
    }
}
