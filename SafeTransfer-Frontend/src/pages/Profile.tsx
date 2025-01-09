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
import { handleFileUploadUser } from "@/helper/FileOperations";
import { jwtDecode } from 'jwt-decode';

function Profile() {
    const [uniqueName, setUniqueName] = useState("");
    const [data, setData] = useState<ManagementFile[]>([]);
    const [user, setUser] = useState<User>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                type DecodedToken = {
                    aud: string;
                    unique_name: string;
                };
                const token = localStorage.getItem("token") || "";
                const decodedToken = jwtDecode<DecodedToken>(token);

                if (typeof decodedToken.unique_name === 'string') {
                    setUniqueName(decodedToken.unique_name);

                    const fetchedUser = await GetUser(decodedToken.unique_name);
                    setUser(fetchedUser);
                    
                    if (fetchedUser) {
                        const files = await GetFilesFromUser(fetchedUser.id);
                        setData(files);
                        console.log(files);
                    } else {
                        console.error("User is undefined");
                    }
                } else {
                    console.error("Invalid token: " + uniqueName);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures this runs only once

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
				</NavigationMenuList>
			</NavigationMenu>
			{loading ? (
				<div>Loading...</div>
			) : (
				<div className="w-2/3 mx-auto">
                    <div className="py-3">
                        {user && <UploadFileDialog id={user.id} username={user.username} password={user.password} />}
                    </div>
					<DataTable columns={columns} data={data}/>
				</div>
			)}
		</>
	);
}

export default Profile;

function UploadFileDialog(user: User) {
    const [open, setOpen] = useState(false);
	const [file, setFile] = useState<File | null>(null);

    const handleUpload = () => {
		if (file) {
			handleFileUploadUser(file, user.id, user.username + user.password);
            setOpen(false);
		} else {
			console.error("No file selected");
            setOpen(false);
		}
    }

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
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