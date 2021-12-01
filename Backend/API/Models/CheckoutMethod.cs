namespace API.Models
{
    public enum CheckoutMethodId : int
    {
        Cash = 0,
        BankCard = 1,

    }

    public class CheckoutMethod
    {
        public CheckoutMethodId CheckoutMethodId { get; set; }
        public string Name { get; set; }
    }
}