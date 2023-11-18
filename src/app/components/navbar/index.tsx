import { useSession } from "next-auth/react";
import * as Avatar from "@radix-ui/react-avatar";
import { ResetButton } from "../reset-button";
import { AuthButton } from "../auth-button";

import { AuthButtonProps } from "../auth-button";

export const Navbar = ({ gameStarted, messages }: AuthButtonProps) => {
  const { data: session } = useSession();

  return (
    <div className="p-2 pt-4 px-4 fixed w-full">
      {session ? (
        <div className="text-sm lg:text-base flex justify-between items-center">
          <ResetButton />

          <div className="flex gap-2 place-items-center">
            <AuthButton gameStarted={gameStarted} messages={messages} />
            <Avatar.Root className="w-6 h-6 rounded-full">
              <Avatar.Image
                className="w-full h-full rounded-full"
                alt="Avatar"
                src={session.user?.image || ""}
              />

              <Avatar.Fallback className="w-full h-full text-sm text-player flex">
                {session.user?.name}
              </Avatar.Fallback>
            </Avatar.Root>
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-end">
          <AuthButton gameStarted={gameStarted} messages={messages} />
        </div>
      )}
    </div>
  );
};
