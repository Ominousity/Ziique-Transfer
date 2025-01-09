import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Login, Register } from "@/api/UserService";
import { useEffect, useState } from "react";
import { handleFileDownload, handleFileUpload } from "@/helper/FileOperations";
import { DialogDescription } from "@radix-ui/react-dialog";
import { GetTransfer } from "@/api/TransferService";
import { TransferFile } from "@/models/EncryptedFile";

function Home() {

  const [file, setFile] = useState<File | null>(null);
  const [epword, setEpword] = useState("");

  const {id} = useParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [downloadfile, setDownloadFile] = useState<TransferFile | null >(null);

  const [downloadPassword, setDownloadPassword] = useState("");

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isUploadID, setUploadID] = useState("")

  useEffect(() => {
      handleIDURL();
  }, [id])
  
  const handleIDURL = async () => {
    if (id) {
      setIsDialogOpen(true);
      const file = await GetTransfer(id);
      setDownloadFile(file);
    }
  }
  const handleDownload = () => {
    handleFileDownload(downloadfile, downloadPassword);
    
  }

  const closeDialog = () => {
    setIsDialogOpen(false);
  }


  const handleLoginButton = (): boolean => {
    const token = localStorage.getItem("token");
    if (token === null) {
      return false;
    } else return true;
  };
  const handleUpload = async() => {
    const uploadid = await handleFileUpload(file!, epword)
     setUploadID(uploadid)
     setIsSubmitted(true);
     
  }
  const handleOpenChange = (open) => {
    if (!open) {
      setIsSubmitted(false); // Reset the submitted state when the dialog is closed
    }
  };
  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center">
        <AsciiArt />
        <div className="text-xl">Ziique Transfer</div>
        <div className="flex flex-row">
          <Input
            type="file"
            className="mr-1"
            placeholder="Upload a file here!"
            id="UploadedFile"
            onChange={(e) => {setFile(e.target.files[0])}}
          ></Input>
        <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">Submit File</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isSubmitted ? "Your URL:" : "Please enter a password you would like to encrypt your file with:"}
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          {isSubmitted ? (
            <div className="grid flex-1 gap-2">
              <Input id="URLField" value={`http://localhost:5173/${isUploadID}`} readOnly />
            </div>
          ) : (
            <div className="grid flex-1 gap-2">
              <Input
                id="EncryptFile"
                placeholder="Please enter a password here"
                type="password"
                onChange={(e) => { setEpword(e.target.value); }}
              />
            </div>
          )}
          {!isSubmitted && (
            <Button type="submit" size="sm" id="SubmitPassword" onClick={handleUpload}>
              Submit
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
        </div>
      </div>
      <div className="absolute top-0 right-0">
        {handleLoginButton() === false ? (
          <LoginAndRegisterButton />
        ) : (
          <LoggedIn />
        )}
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Would you like to download {downloadfile?.fileName}?
            </DialogTitle>
            <DialogDescription> Please type the provided password for the file:</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center">
          <Input type="password" onChange={(e) => {setDownloadPassword(e.target.value)}}></Input>
          <Button className="mt-1 w-1/3" onClick={handleDownload}>Download File</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Home;

const AsciiArt = () => {
  return (
    <div className="flex justify-center items-center">
      <pre className="font-mono text-white text-sm whitespace-pre leading-none">
        {`
    ⠀⠀⠀⠀⠀⢸⠓⢄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⢸⠀⠀⠑⢤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⢸⡆⠀⠀⠀⠙⢤⡷⣤⣦⣀⠤⠖⠚⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⣠⡿⠢⢄⡀⠀⡇⠀⠀⠀⠀⠀⠉⠀⠀⠀⠀⠀⠸⠷⣶⠂⠀⠀⠀⣀⣀⠀⠀⠀
    ⢸⣃⠀⠀⠉⠳⣷⠞⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠉⠉⠉⠉⠉⠉⢉⡭⠋
    ⠀⠘⣆⠀⠀⠀⠁⠀⢀⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡴⠋⠀⠀
    ⠀⠀⠘⣦⠆⠀⠀⢀⡎⢹⡀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⡀⣠⠔⠋⠀⠀⠀⠀
    ⠀⠀⠀⡏⠀⠀⣆⠘⣄⠸⢧⠀⠀⠀⠀⢀⣠⠖⢻⠀⠀⠀⣿⢥⣄⣀⣀⣀⠀⠀
    ⠀⠀⢸⠁⠀⠀⡏⢣⣌⠙⠚⠀⠀⠠⣖⡛⠀⣠⠏⠀⠀⠀⠇⠀⠀⠀⠀⢙⣣⠄
    ⠀⠀⢸⡀⠀⠀⠳⡞⠈⢻⠶⠤⣄⣀⣈⣉⣉⣡⡔⠀⠀⢀⠀⠀⣀⡤⠖⠚⠀⠀
    ⠀⠀⡼⣇⠀⠀⠀⠙⠦⣞⡀⠀⢀⡏⠀⢸⣣⠞⠀⠀⠀⡼⠚⠋⠁⠀⠀⠀⠀⠀
    ⠀⢰⡇⠙⠀⠀⠀⠀⠀⠀⠉⠙⠚⠒⠚⠉⠀⠀⠀⠀⡼⠁⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⢧⡀⠀⢠⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⣞⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠙⣶⣶⣿⠢⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠉⠀⠀⠀⠙⢿⣳⠞⠳⡄⠀⠀⠀⢀⡞⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠀⠀⠹⣄⣀⡤⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
          `}
      </pre>
    </div>
  );
};



function LoginAndRegisterButton() {
    const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
    const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
    const [Password, setPassword] = useState("");
    const [Username, setUsername] = useState("");
    const handleLoginButton = (): boolean => {
      const token = localStorage.getItem("token");
      if (token === null) {
        return false;
      } else return true;
    };

    const handleLogin = async () => {
        const User = {id:"00000000-0000-0000-0000-000000000000", username: Username, password: Password }
        Login(User)
        setIsLoginDialogOpen(false)
    }
    const handleRegister = () => {
        const User = {id:"00000000-0000-0000-0000-000000000000", username: Username, password: Password }
        setIsRegisterDialogOpen(false)
        Register(User)
    }
  return (
    <>
    <NavigationMenu className="p-3">
        <NavigationMenuList>
            <NavigationMenuItem>
            <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="mr-1">
            Login
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Login here!</DialogTitle>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Input id="Username" placeholder="Username" onChange={(e) => {setUsername(e.target.value)}} ></Input>
              <Input
                id="Password"
                type="Password"
                placeholder="Password"
                onChange={(e) => {setPassword(e.target.value)}}
              ></Input>
            </div>
            <Button type="submit" size="sm" id="SubmitLogin" onClick={handleLogin}>
              Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
        </NavigationMenuItem>
        <NavigationMenuItem>
        <Dialog open={isRegisterDialogOpen} onOpenChange={setIsRegisterDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Register</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Register here!</DialogTitle>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Input id="Username" placeholder="Username" onChange={(e) => {setUsername(e.target.value)}}></Input>
              <Input
                id="Password"
                type="Password"
                placeholder="Password"
                onChange={(e) => {setPassword(e.target.value)}}
              ></Input>
            </div>
            <Button type="submit" size="sm" id="SubmitRegister" onClick={handleRegister}> 
              Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
        </NavigationMenuItem>
      </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}

function LoggedIn() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/Profile");
  };
  return (
    <>
      <NavigationMenu className="p-3">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Button
              variant="outline"
              className="mr-1"
              id="profile"
              onClick={handleClick}
            >
              Profile
            </Button>
          </NavigationMenuItem>
          <NavigationMenuItem>
          <Button variant="outline" type="submit" className="mr-1" id="logout">
          Logout
        </Button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}
