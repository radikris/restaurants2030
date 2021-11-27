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
    public class GetAllFoodDrinkQuery : IRequest<List<FoodDrink>>
    {
        public int RestaurantId { get; set; }

        public class GetAllFoodDrinkQueryHandler : IRequestHandler<GetAllFoodDrinkQuery, List<FoodDrink>>
        {
            private readonly ApplicationDbContext _context;

            public GetAllFoodDrinkQueryHandler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<List<FoodDrink>> Handle(GetAllFoodDrinkQuery request, CancellationToken cancellationToken)
            {
                return await _context.FoodsDrinks.Where(x => x.RestaurantId == request.RestaurantId).ToListAsync();
            }
        }
    }
}
