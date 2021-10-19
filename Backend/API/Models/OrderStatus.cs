namespace API.Models
{
    public enum OrderStatusId : int
    {
        InProgress = 0,
        Ready = 1,
        Served = 2
    }

    public class OrderStatus
    {
        public OrderStatusId OrderStatusId { get; set; }
        public string Name { get; set; }
    }
}