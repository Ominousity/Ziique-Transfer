using System;
using Domain.Management;

namespace Application.Interfaces;

public interface IManagementService
{
    void SaveFileToUser(ManagementFile file);
    List<ManagementFile> GetFilesFromUser(Guid userID);
    void DeleteFile(Guid fileID);
}
