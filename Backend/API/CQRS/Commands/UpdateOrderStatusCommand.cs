using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using API.Infrastructure;
using API.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace API.CQRS.Commands
{
    public class UpdateOrderStatusCommand : IRequest<Order>
    {
        public int Id { get; set; }
        public OrderStatusId OrderStatus { get; set; }

        public class UpdateOrderStatusCommandHandler : IRequestHandler<UpdateOrderStatusCommand, Order>
        {
            private readonly ApplicationDbContext _context;

            public UpdateOrderStatusCommandHandler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<Order> Handle(UpdateOrderStatusCommand request, CancellationToken cancellationToken)
            {
                var order = await _context.Orders.Where(x => x.Id == request.Id).Include(p => p.FoodDrink).FirstOrDefaultAsync();
                if (order != null)
                {
                    order.OrderStatusId = request.OrderStatus;
                    await _context.SaveChangesAsync();

                    return order;
                }

                return null;
            }
        }
    }
}