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
    public class AddNewOrdersQuery : IRequest<List<Order>>
    {
        public int RestaurantId { get; set; }

        public int TableNum { get; set; }
        public List<FoodDrinkDTO> NewOrders {get; set;}

        public class AddNewOrdersQueryHandler : IRequestHandler<AddNewOrdersQuery, List<Order>>
        {
            private readonly ApplicationDbContext _context;

            public AddNewOrdersQueryHandler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<List<Order>> Handle(AddNewOrdersQuery request, CancellationToken cancellationToken)
            {
                //create new order
                Console.WriteLine("request jott");
                Console.WriteLine(request.NewOrders.Count);
                List<Order> returnOrderList =new List<Order>();
                foreach (var newOrder in request.NewOrders)
                {
                    Console.WriteLine("newOrder quantityja");
                    Console.WriteLine(newOrder.Quantity);

                    for (int i=0; i<newOrder.Quantity; i++)
                    {
                        Console.WriteLine("fooddrink");

                        FoodDrink fd = await _context.FoodsDrinks.Where(x => x.Id == newOrder.Id).FirstOrDefaultAsync();
                        Console.WriteLine("order");

                        Order o = new Order
                        {
                            FoodDrinkId = fd.Id,
                            RestaurantId = request.RestaurantId,
                            Table = request.TableNum,
                            //FoodDrink=fd,
                            OrderStatusId = OrderStatusId.InProgress
                        };
                        _context.Orders.Add(o);
                        //var order = await _context.Orders.Where(x => x.Id == o.Id).Include(p => p.FoodDrink).FirstOrDefaultAsync();

                        returnOrderList.Add(o);
                    }
                }
                _context.SaveChanges();
                Console.WriteLine("response megy");

                Console.WriteLine(returnOrderList.Count);
               

                return returnOrderList;
            }

        }
    }
}
