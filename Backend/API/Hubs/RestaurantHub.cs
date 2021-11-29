using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using API.CQRS.Commands;
using API.CQRS.Queries;
using API.DTO;
using API.Models;
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
            Console.WriteLine("+1");
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await base.OnDisconnectedAsync(exception);
        }

        public async Task GetAllOrders()
        {
            var orders = await _mediator.Send(new GetAllOrderQuery
            {
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

        public async Task GetAllFoodDrink()
        {
            var foodDrinks = await _mediator.Send(new GetAllFoodDrinkQuery
            {
                RestaurantId = int.Parse(((ClaimsIdentity)Context.User.Identity).FindFirst("Restaurant").Value)

            });

            var list = new List<FoodDrinkDTO>();
            foodDrinks.ForEach(foodDrink => list.Add(new
                FoodDrinkDTO
            (
                foodDrink.Id,
                foodDrink.Name,
                foodDrink.Price,
                0
            )));
            await Clients.Caller.SendAsync("AllFoodDrinksHandler", list);
        }

        public async Task AddNewOrders(AddNewOrdersQuery query)
        {
            query.RestaurantId = int.Parse(((ClaimsIdentity)Context.User.Identity).FindFirst("Restaurant").Value);
            var newOrdersList = await _mediator.Send(query);
            var list = new List<OrderDTO>();

            foreach (var order in newOrdersList)
            {
                Console.WriteLine(order.Id);
                Console.WriteLine(order.FoodDrink.Name);
                Console.WriteLine(order.FoodDrink.Price);
                Console.WriteLine(order.Table);
                Console.WriteLine(order.OrderStatusId);
                OrderDTO orderDTO = new OrderDTO
                {
                    Id = order.Id,
                    Name = order.FoodDrink.Name,
                    Price = order.FoodDrink.Price,
                    Table = order.Table,
                    OrderStatus = order.OrderStatusId
                };

                list.Add(orderDTO);
            }

            await Clients.All.SendAsync("AddNewOrdersHandler", list);

        }

        public async Task AddNewFoodDrink(AddNewFoodDrinkQuery query)
        {
            query.RestaurantId = int.Parse(((ClaimsIdentity)Context.User.Identity).FindFirst("Restaurant").Value);
            var newFoodDrink = await _mediator.Send(query);
            await Clients.Caller.SendAsync("AddNewFoodDrinkHandler", newFoodDrink);
        }

        public async Task PayOrder(PayOrderQuery query)
        {
            query.RestaurantId = int.Parse(((ClaimsIdentity)Context.User.Identity).FindFirst("Restaurant").Value);
            await _mediator.Send(query);
            await Clients.Caller.SendAsync("PayOrdersHandler");
        }
    }
}