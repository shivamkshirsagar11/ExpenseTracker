namespace ExpenseTracker.Models
{
    public class Expense
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public string? Name { get; set; } = string.Empty;

        public float Amount { get; set; }

        public string? Date { get; set; }

        public string? Category { get; set; }
    }
}
