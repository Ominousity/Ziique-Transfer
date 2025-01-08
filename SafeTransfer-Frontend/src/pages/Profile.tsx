import { GetFilesFromUser } from "@/api/ManagementService";
import { GetUser } from "@/api/UserService";
import { DataTable } from "@/components/DataTable";
import { columns } from "@/components/DataTableColumns";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ManagementFile } from "@/models/EncryptedFile";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { User } from "@/models/User";
import { handleFileUpload } from "@/helper/FileOperations";

function Profile() {
	const [data, setData] = useState<ManagementFile[]>([]);
    const [user, setUser] = useState<User>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const user = await GetUser("username");
				const files = await GetFilesFromUser(user.ID);
                setUser(user);
				setData(files);
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	return (
		<>
			<NavigationMenu className="p-3">
				<NavigationMenuList>
					<NavigationMenuItem>
						<Link to={"/"}>
							<Button variant={"outline"}>
								<FontAwesomeIcon icon={faArrowLeft} />
								&nbsp; Back
							</Button>
						</Link>
					</NavigationMenuItem>
					<NavigationMenuItem>
						{user && <UploadFileDialog ID={user.ID} Username={user.Username} Password={user.Password} />}
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
			{loading ? (
				<div>Loading...</div>
			) : (
				<div className="w-2/3 mx-auto">
					<DataTable columns={columns} data={data}/>
				</div>
			)}
		</>
	);
}

export default Profile;

function UploadFileDialog(user: User) {
	const [file, setFile] = useState<File | null>(null);

    const handleUpload = () => {
		if (file) {
			handleFileUpload(file, user.Username + user.Password);
		} else {
			console.error("No file selected");
		}
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger>
                    <Button variant={"outline"}>Upload New File</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Upload New File</DialogTitle>
                    </DialogHeader>
                    <div>
						<Input type="file" onChange={(e) => {
							if (e.target.files && e.target.files.length > 0) {
								setFile(e.target.files[0]);
							}
						}}/>
                        <Button variant={"outline"} onClick={handleUpload}>Upload File</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}