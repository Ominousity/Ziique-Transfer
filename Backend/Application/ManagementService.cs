using System;
using Application.Interfaces;
using Domain.Management;

namespace Application;

public class ManagementService : IManagementService
{
    private readonly IManagementRepo _managementRepo;

    public ManagementService(IManagementRepo managementRepo)
    {
        _managementRepo = managementRepo;
    }

    public List<ManagementFile> GetFilesFromUser(Guid userID)
    {
        return _managementRepo.GetFilesFromUser(userID);
    }

    public void SaveFileToUser(ManagementFile file)
    {
        _managementRepo.SaveFileToUser(file);
    }

    public void DeleteFile(Guid fileID)
    {
        _managementRepo.DeleteFile(fileID);
    }
}
