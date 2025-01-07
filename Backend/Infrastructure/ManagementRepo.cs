using Application.Interfaces;
using Domain.Management;

namespace Infrastructure;

public class ManagementRepo : IManagementRepo
{
    private readonly DatabaseContext _context;

    public ManagementRepo(DatabaseContext context)
    {
        _context = context;
    }

    public List<ManagementFile> GetFilesFromUser(Guid userID)
    {
        try
        {
            return _context.ManagementFiles.Where(x => x.UserID == userID).ToList();
        }
        catch (Exception)
        {
            return null;
        }
    }

    public void SaveFileToUser(ManagementFile ManagementFile)
    {
        _context.ManagementFiles.Add(ManagementFile);
        _context.SaveChanges();
    }

    public void DeleteFile(Guid fileID)
    {
        ManagementFile? file = _context.ManagementFiles.Find(fileID);
        if (file is null)
        {
            throw new Exception("File not found");
        }
        _context.ManagementFiles.Remove(file);
        _context.SaveChanges();
    }
}
