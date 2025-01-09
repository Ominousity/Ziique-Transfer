using Application.Interfaces;
using Domain.Transfer;

namespace API.Workers;

public class TransferWorker : IHostedService, IDisposable
{
    private Timer? _timer;
    private readonly ITransferService _transferService;

    public TransferWorker(ITransferService transferService)
    {
        _transferService = transferService;
    }

    public Task StartAsync(CancellationToken cancellationToken)
    {
        _timer = new Timer(DoWork, null, TimeSpan.Zero, TimeSpan.FromHours(1));

        return Task.CompletedTask;
    }

    private void DoWork(object? state)
    {
        Console.WriteLine("TransferWorker now running");

        List<TransferFile> transfers = _transferService.GetAllTransfers();
        foreach (var transfer in transfers)
        {
            if (transfer.CreatedDate < DateTime.Now.AddHours(5))
            {
                _transferService.DeleteTransfer(transfer.TransferID);
                Console.WriteLine($"Transfer {transfer.TransferID} has expired and has been deleted");
            }
        }
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
        _timer?.Change(Timeout.Infinite, 0);

        return Task.CompletedTask;
    }

    public void Dispose()
    {
        _timer?.Dispose();
    }
}
