using Application.Interfaces;
using Domain;
using Microsoft.AspNetCore.Http;
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
            var transfer = _transferService.GetEncryptedTransfer(transferID);
            return Ok(transfer);
        }

        [HttpPost]
        public ActionResult<Guid> SaveEncryptedTransfer([FromBody] TransferFile transfer)
        {
            Guid ID = _transferService.SaveEncryptedTransfer(transfer);
            return Ok(ID);
        }
    }
}
