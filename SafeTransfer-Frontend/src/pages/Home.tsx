import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

function Home() {
  const handleLoginButton = (): boolean => {
    const token = localStorage.getItem("token");
    if (token === null) {
      return false;
    } else return true;
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
          ></Input>
          <Button variant="outline">Submit Placeholder</Button>
        </div>
      </div>
      <div className="absolute top-0 right-0">
        {handleLoginButton() === false ? (
          <LoginAndRegisterButton />
        ) : (
          <LoggedIn />
        )}
      </div>
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
  return (
    <>
    <NavigationMenu className="p-3">
        <NavigationMenuList>
            <NavigationMenuItem>
            <Dialog>
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
              <Input id="Username" placeholder="Username"></Input>
              <Input
                id="Password"
                type="Password"
                placeholder="Password"
              ></Input>
            </div>
            <Button type="submit" size="sm" id="SubmitLogin">
              Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
        </NavigationMenuItem>
        <NavigationMenuItem>
        <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Register</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Register here!</DialogTitle>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Input id="Username" placeholder="Username"></Input>
              <Input
                id="Password"
                type="Password"
                placeholder="Password"
              ></Input>
              <Input
                id="ConfirmPassword"
                type="Password"
                placeholder="Confirm Password"
              ></Input>
            </div>
            <Button type="submit" size="sm" id="SubmitRegister">
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
