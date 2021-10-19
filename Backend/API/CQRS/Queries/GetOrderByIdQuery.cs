using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using API.Infrastructure;
using API.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace API.CQRS.Queries
{
    public class GetOrderByIdQuery : IRequest<Order>
    {
        public int OrderId { get; set; }

        public class GetOrderByIdQueryHandler : IRequestHandler<GetOrderByIdQuery, Order>
        {
            private readonly ApplicationDbContext _context;

            public GetOrderByIdQueryHandler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<Order> Handle(GetOrderByIdQuery request, CancellationToken cancellationToken)
            {
                return await _context.Orders.Where(x => x.Id == request.OrderId).FirstOrDefaultAsync();
            }
        }
    }
}