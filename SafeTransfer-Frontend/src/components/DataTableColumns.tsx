import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { MoreHorizontal } from "lucide-react";
import { handleFileDownload } from "@/helper/FileOperations";
import { DeleteFileFromUser } from "@/api/ManagementService";

export const columns = (encryptionKey: string) => [
	{
	  accessorKey: "id",
	  header: "ID",
	},
	{
	  accessorKey: "fileName",
	  header: "File Name",
	},
	{
	  accessorKey: "contentType",
	  header: "Content Type",
	},
	{
	  id: "actions",
	  cell: ({ row }: { row: { original: { id: string; fileName: string; contentType: string; }; }; }) => {
		return (
		  <DropdownMenu>
			<DropdownMenuTrigger asChild>
			  <Button variant="ghost" className="h-8 w-8 p-0">
				<span className="sr-only">Open menu</span>
				<MoreHorizontal className="h-4 w-4" />
			  </Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
			  <DropdownMenuLabel>Actions</DropdownMenuLabel>
			  <DropdownMenuItem
				onClick={() =>
				  handleFileDownload(row.original, encryptionKey)}
			  >
				Download File
			  </DropdownMenuItem>
			  <DropdownMenuItem
				onClick={() =>
				  DeleteFileFromUser(row.original.id)}
			  >
				Delete File
			  </DropdownMenuItem>
			</DropdownMenuContent>
		  </DropdownMenu>
		);
	  },
	},
  ];
