using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using API.CQRS.Commands;
using API.CQRS.Queries;
using API.DTO;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace API.Hubs
{
    [Authorize]
    public class RestaurantHub : Hub
    {
        private readonly IMediator _mediator;

        public RestaurantHub(IMediator mediator)
        {
            _mediator = mediator;
        }

        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await base.OnDisconnectedAsync(exception);
        }

        public async Task GetAllOrders()
        {
            var orders = await _mediator.Send(new GetAllOrderQuery{ 
                RestaurantId = int.Parse(((ClaimsIdentity)Context.User.Identity).FindFirst("Restaurant").Value)
            });
            var list = new List<OrderDTO>();
            orders.ForEach(order => list.Add(new 
                OrderDTO
                {
                    Id = order.Id, 
                    Name = order.FoodDrink.Name, 
                    Price = order.FoodDrink.Price, 
                    Table = order.Table, 
                    OrderStatus = order.OrderStatusId
                }));

            await Clients.Caller.SendAsync("AllOrders", list);
        }

        public async Task UpdateOrderStatus(UpdateOrderStatusCommand orderStatusCommand)
        {
            var order = await _mediator.Send(orderStatusCommand);
            OrderDTO orderDTO = new OrderDTO
            {
                Id = order.Id, 
                Name = order.FoodDrink.Name, 
                Price = order.FoodDrink.Price, 
                Table = order.Table, 
                OrderStatus = order.OrderStatusId
            };

            await Clients.All.SendAsync("OrderStatusUpdated", orderDTO);
        }
    }
}