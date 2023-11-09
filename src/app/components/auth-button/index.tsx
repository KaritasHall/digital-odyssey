import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";

export const AuthButton = () => {
  const { data: session, status } = useSession();
  console.log(session, status);
  return (
    <div className="text-player p-2">
      {/* If user is logged in */}
      {session ? (
        <div className="text-xs flex justify-between">
          Hi, {session.user?.name} <br />
          <button
            className="hover:text-storyteller text-sm"
            onClick={() => signOut()}
          >
            Log out
          </button>
        </div>
      ) : (
        // If user is not logged in

        <button
          className="text-sm hover:text-storyteller"
          onClick={() => signIn()}
        >
          Login
        </button>
      )}
    </div>
  );
};
