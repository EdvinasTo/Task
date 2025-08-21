namespace Task.Server.Models.ResponseDtos
{
    public class PackageDetailsResponseDto
    {
        public PersonInfo SenderInfo { get; set; }

        public PersonInfo RecipientInfo { get; set; }

        public PackageHistory[] packageHistory { get; set; }
    }
}