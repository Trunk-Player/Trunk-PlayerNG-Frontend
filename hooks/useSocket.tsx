import { useContext } from "react";
import { SocketIOContext } from "@/lib/app/socketClient";

export const useSocket = () => {
  const context = useContext(SocketIOContext);

  return context.socket;
};
