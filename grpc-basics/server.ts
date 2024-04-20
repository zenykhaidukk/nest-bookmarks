import { ProtoGrpcType } from "./proto/random";
import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { RandomHandlers } from "./proto/randomPackage/Random";
import { TodoRequest } from "./proto/randomPackage/TodoRequest";
import { ChatRequest } from "./proto/randomPackage/ChatRequest";
import { ChatResponse } from "./proto/randomPackage/ChatResponse";

const PORT = 3006;
const PROTO_FILE = path.resolve(__dirname, "proto/random.proto");

const packageDef = protoLoader.loadSync(PROTO_FILE);
const grpcObject = grpc.loadPackageDefinition(packageDef) as unknown as ProtoGrpcType;

const randomPackage = grpcObject.randomPackage;

const todoList: TodoRequest[] = [];
const callObjectByUsername = new Map<string, grpc.ServerDuplexStream<ChatRequest, ChatResponse>>();

function main() {
  const server = getServer();
  server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.error(err);
    }
    console.log(`Server is running on port ${port}`);
  });
}
function getServer() {
  const server = new grpc.Server();
  server.addService(randomPackage.Random.service, {
    PingPong: (_, res) => {
      res(null, { message: "Pong" });
    },
    RandomNumbers: (call) => {
      const { maxVal = 10 } = call.request;
      let runCount = 0;
      const id = setInterval(() => {
        call.write({ num: Math.floor(Math.random() * maxVal) });

        runCount = ++runCount;
        if (runCount > 10) {
          call.end();
          clearInterval(id);
        }
      }, 500);
    },
    TodoList: (call, cb) => {
      call.on("data", (chunk) => {
        todoList.push(chunk);
      });

      call.on("end", () => {
        cb(null, { todos: todoList });
      });
    },
    Chat: (call) => {
      const username = call.metadata.get("username")[0] as string;

      call.on("data", (req) => {
        const message = req.message;
        for (let [_, usersCall] of callObjectByUsername) {
          usersCall.write({
            username,
            message,
          });
        }
        if (callObjectByUsername.get(username) === undefined) callObjectByUsername.set(username, call);
      });
      call.on("end", () => {
        callObjectByUsername.delete(username);
        call.write({ message: `See you later ${username}!`, username: "Server" });
      });
    },
  } as RandomHandlers);
  return server;
}

main();
