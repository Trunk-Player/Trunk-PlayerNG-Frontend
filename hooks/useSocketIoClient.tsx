import { useEffect, useState } from "react";
import { Manager, Socket } from "socket.io-client";
import * as appLib from "@/lib/app/appLib";
import * as authentication from "lib/auth/authentication";
import type { SocketTransmission } from "@/types/socket/SocketTransmission";
// import { accessToken } from "@/utils/axios";

export const useSocketIoClient = () => {
  const [socketContext, setSocketContext] = useState<{
    socket?: Socket;
  }>({});

  useEffect(() => {
    const baseUrl = appLib.getSocketIoBaseUrl();
    const url = baseUrl !== undefined && baseUrl !== null ? baseUrl : "/api";

    const connectToSocket = async () => {
      let refreshTokens = await authentication.refreshAuthToken();

      const manager = new Manager(url, {
        extraHeaders: {
          Authorization: "123",
        },
        // extraHeaders: {
        //   Authorization:
        //     refreshTokens && refreshTokens.access_token ? refreshTokens.access_token : "123",
        // },
      });

      if (manager && refreshTokens) {
        console.log("Socket Url", url);
        // console.log("Access Token", refreshTokens.access_token);

        const socket = manager.socket("/");
        setSocketContext({ socket });

        socket.on("connect", async () => {
          console.log("Connected to Socket.io Server.");
          setSocketContext({ socket });
        });

        socket.on("connect_error", (error) => {
          console.log("Failed to connect to Socket.io Server.", error);
        });

        manager.on("error", (error) => {
          console.log("Socket.io client error", error);
        });

        manager.on("reconnect", (attempt) => {
          console.log("Reconnect to Socket.io Server.", attempt);
        });

        manager.on("reconnect_error", (error) => {
          console.log("Socket.io client reconnect error", error);
        });

        manager.on("reconnect_failed", () => {
          console.log("Failed to reconnect to Socket.io Server.");
        });

        socket.on("reconnect_attempt", () => {
          console.log("Attempting to reconnect to Socket.io Server (socket).");
        });

        manager.on("reconnect_attempt", async (attempt) => {
          console.log(
            "Attempting to reconnect to Socket.io Server (manager).",
            attempt
          );
          refreshTokens = await authentication.refreshAuthToken();
          if (manager) {
            manager.opts.extraHeaders = {
              Authorization: refreshTokens.access_token
                ? refreshTokens.access_token
                : "123",
            };
          }
        });

        socket.on("transmission_party_bus", (msg: SocketTransmission) => {
          console.log("New Transmission", {
            talkgroup: msg.parents.find((p) => p.type === "talkgroup")?.uuid[0],
          });
        });

        socket.on("debug", (msg: any) => {
          if (process.env.NODE_ENV === "development") {
            console.log("[DEBUG] Socket debug message", msg);
          }
        });

        socket.on("unicast", (msg: any) => {
          console.log("[ATTENTION] Unknown unicast channel message", msg);
        });

        socket.on("parents_rapid_genetic_mutations", (msg) => {
          console.log("A change was made", msg);
        });

        socket.on("alert", (msg) => {
          console.log("New alert from server", msg);
          alert(`New alert from server: ${JSON.stringify(msg)}`);
        });

        socket.on("disconnect", async () => {
          console.log("Disconnected from Socket.io Server.");
          refreshTokens = await authentication.refreshAuthToken();
          if (manager) {
            manager.opts.extraHeaders = {
              Authorization: refreshTokens.access_token
                ? refreshTokens.access_token
                : "123",
            };
          }
          if (socket) {
            setSocketContext({ socket });
            socket.connect();
          }
        });

        socket.connect();
      }

      return () => {
        setSocketContext({});
        if (socketContext.socket) {
          socketContext.socket.disconnect();
        }

        console.log(
          "Disconnected from Socket.io Server (Component Tear-Down)."
        );
      };
    };

    connectToSocket().then((res) => {
      return res;
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [socketContext];
};
