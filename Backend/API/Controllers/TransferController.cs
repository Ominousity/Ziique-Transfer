using Application.Interfaces;
using Domain.Transfer;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransferController : ControllerBase
    {
        private readonly ITransferService _transferService;

        public TransferController(ITransferService transferService)
        {
            _transferService = transferService;
        }

        [HttpGet("{transferID}")]
        public ActionResult<TransferFile> GetEncryptedTransfer(Guid transferID)
        {
            try
            {
                var transfer = _transferService.GetTransfer(transferID);
                return Ok(transfer);
            }
            catch (Exception)
            {
                return NotFound();
            }
        }

        [HttpPost]
        public ActionResult<TransferDTO> SaveEncryptedTransfer([FromBody] TransferFile transfer)
        {
            TransferDTO TransferId = new TransferDTO
            {
                TransferID = _transferService.SaveTransfer(transfer)
            };
            return Ok(TransferId);
        }
    }
}
