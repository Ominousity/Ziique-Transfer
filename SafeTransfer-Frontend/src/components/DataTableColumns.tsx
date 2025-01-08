import { ManagementFile } from "@/models/EncryptedFile";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<ManagementFile>[] = [
	{
		accessorKey: "ID",
		header: "ID",
	},
	{
		accessorKey: "FileName",
		header: "File Name",
	},
	{
		accessorKey: "ContentType",
		header: "Content Type",
	},
];
