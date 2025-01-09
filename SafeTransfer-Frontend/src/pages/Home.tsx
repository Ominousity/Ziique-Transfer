import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useNavigate, useParams } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Login, Register } from "@/api/UserService";
import { useEffect, useState } from "react";
import { handleFileUpload } from "@/helper/FileOperations";
import { DialogDescription } from "@radix-ui/react-dialog";

function Home() {

  const [file, setFile] = useState<File | null>(null);
  const [epword, setEpword] = useState("");

  const {id} = useParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (id) {
      setIsDialogOpen(true);
    }
  })

  const closeDialog = () => {
    setIsDialogOpen(false);
  }


  const handleLoginButton = (): boolean => {
    const token = localStorage.getItem("token");
    if (token === null) {
      return false;
    } else return true;
  };
  const handleUpload = () => {
     handleFileUpload(file!, epword)
     console.log("hårdt billedet uploaded!!")
  }
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
          <Dialog>
          <DialogTrigger asChild>
          <Button variant="outline">Submit File</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Please enter a password you would like to encrypt your file with:
              </DialogTitle>
            </DialogHeader>
            <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Input id="EncryptFile" placeholder="Please enter a password here" type="password" onChange={(e) => {setEpword(e.target.value)}}></Input>
              </div>
              <Button type="submit" size="sm" id="SubmitPassword" onClick={handleUpload}>
              Submit
            </Button>
              </div>
          </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="absolute top-0 right-0">
        {handleLoginButton() === false ? (
          <LoginAndRegisterButton checkLogin={checkLogin} />
        ) : (
          <LoggedIn />
        )}
      </div>
      <Dialog open={isDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              PlaceHolder Should be name of file?
            </DialogTitle>
            <DialogDescription> idk something here maybe?</DialogDescription>
          </DialogHeader>
          <div className="flex flex-row">
          <Input disabled type="link"></Input>
          <Button></Button>
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

interface LoginAndRegisterButtonProps {
  checkLogin: () => Promise<void>;
}

function LoginAndRegisterButton({ checkLogin }: LoginAndRegisterButtonProps) {
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
        const User = {ID:"00000000-0000-0000-0000-000000000000", Username: Username, Password: Password }
        Login(User)
        setIsLoginDialogOpen(false)
        await checkLogin()
    }
    const handleRegister = () => {
        const User = {ID:"00000000-0000-0000-0000-000000000000", Username: Username, Password: Password }
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
