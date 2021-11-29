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
    public class PayOrderQuery : IRequest<List<Order>>
    {
        public int RestaurantId { get; set; }

        public List<OrderDTO> PaidOrders { get; set; }

        public CheckoutMethodId CheckoutMethod { get; set; }

        public class PayOrderQueryHandler : IRequestHandler<PayOrderQuery, List<Order>>
        {
            private readonly ApplicationDbContext _context;

            public PayOrderQueryHandler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<List<Order>> Handle(PayOrderQuery request, CancellationToken cancellationToken)
            {

                foreach (var paidOrder in request.PaidOrders)
                {
                    var findPaidOrder = await _context.Orders.FirstOrDefaultAsync(o => o.Id == paidOrder.Id);
                    _context.Orders.Remove(findPaidOrder);

                    var paidO = new PaidOrder { RestaurantId = request.RestaurantId, Table = paidOrder.Table, FoodDrinkId = findPaidOrder.FoodDrinkId, CheckoutMethodId = request.CheckoutMethod };
                    _context.PaidOrders.Add(paidO);
                }
                await _context.SaveChangesAsync();
                return null;

            }

        }
    }
}
