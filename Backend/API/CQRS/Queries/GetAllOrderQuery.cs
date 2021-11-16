using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using API.Infrastructure;
using API.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace API.CQRS.Queries
{
    public class GetAllOrderQuery : IRequest<List<Order>>
    {
        public int RestaurantId { get; set; }

        public class GetAllOrderQueryHandler : IRequestHandler<GetAllOrderQuery, List<Order>>
        {
            private readonly ApplicationDbContext _context;

            public GetAllOrderQueryHandler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<List<Order>> Handle(GetAllOrderQuery request, CancellationToken cancellationToken)
            {
                return await _context.Orders.Where(x => x.RestaurantId == request.RestaurantId).Include(p => p.FoodDrink).ToListAsync();
            }
        }
    }
}