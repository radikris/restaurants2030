using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.CQRS.Commands;
using API.CQRS.Queries;
using API.DTO;
using API.Models;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.Hubs
{
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

        public async Task GetAllOrders(GetAllOrderQuery query)
        {
            var orders = await _mediator.Send(query);
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

        public async Task GetAllFoodDrink(GetAllFoodDrinkQuery query)
        {
            var foodDrinks = await _mediator.Send(query);
            var list = new List<FoodDrinkDTO>();
            foodDrinks.ForEach(foodDrink => list.Add(new
                FoodDrinkDTO
            {
                Id = foodDrink.Id,
                Name = foodDrink.Name,
                Price = foodDrink.Price,
                Quantity = 0,

            }));
            await Clients.Caller.SendAsync("AllFoodDrinksHandler", list);
        }

        public async Task AddNewOrders(AddNewOrdersQuery query)
        {
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
            var newFoodDrink = await _mediator.Send(query);
            System.Console.WriteLine(newFoodDrink.Id);
            await Clients.Caller.SendAsync("AddNewFoodDrinkHandler", newFoodDrink);
        }
    }
}