import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext/userContext";
import logo from "../assets/images/logos/logo.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header() {
  const userCtx = useContext(UserContext);
  const userIsLogged = userCtx.user?.token;
  const userId = userCtx.user?._id;
  const imageUser = userCtx.user?.imageUser;
  const initials = userCtx.user?.initials;

  return (
    <header className="sticky top-0 z-30 p-3 flex justify-between items-center">
      <Link href="/">
        <a className="flex">
          <Image src={logo} alt="logo" width={40} height={40} />
        </a>
      </Link>

      <div className="flex items-center">
        {userCtx.user !== null &&
          (userIsLogged ? (
            <Link href={`/user/${userId}`}>
              <a className="ml-2 rounded-full">
                <Avatar>
                  <AvatarImage src={imageUser} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              </a>
            </Link>
          ) : (
            <Link href="/user">
              <a className="ml-2 inline-flex items-center justify-center bg-blue-600 text-white h-10 py-2 px-4 rounded-full text-lg">
                s&apos;identifier
              </a>
            </Link>
          ))}
      </div>
    </header>
  );
}
