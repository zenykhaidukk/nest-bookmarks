import { ProtoGrpcType } from "./proto/random";
import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import readline from "readline";

const PORT = 3006;
const PROTO_FILE = path.resolve(__dirname, "proto/random.proto");

const packageDef = protoLoader.loadSync(PROTO_FILE);
const grpcObject = grpc.loadPackageDefinition(packageDef) as unknown as ProtoGrpcType;

const client = new grpcObject.randomPackage.Random(`0.0.0.0:${PORT}`, grpc.credentials.createInsecure());

const deadline = new Date();

deadline.setSeconds(deadline.getSeconds() + 5);
client.waitForReady(deadline, (e) => {
  if (e) return console.log(e);
  onClientReady();
});

function onClientReady() {
  // unary req-res
  // client.PingPong({ message: "Ping" }, (err, res) => {
  //   if (err) return console.log(err);
  //   console.log(res);
  // });

  // server streaming
  // const stream = client.RandomNumbers({ maxVal: 85 });
  // stream.on("data", (chunk) => {
  //   console.log("chunk", chunk);
  // });
  // stream.on("end", () => {
  //   console.log("stream ended");
  // });

  // client streaming
  // const stream = client.TodoList((err, res) => {
  //   if (err) return console.log(err);
  //   console.log(res);
  // });
  // stream.write({ todo: "walk the dog", status: "done" });
  // stream.write({ todo: "get a job", status: "in progress" });
  // stream.write({ todo: "feed the dog", status: "todo" });
  // stream.end();

  // bi-directional streaming
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const username = process.argv[2];
  if (!username) console.error("no username can join chat!"), process.exit();
  const metadata = new grpc.Metadata();
  metadata.set("username", username);
  const call = client.Chat(metadata);
  call.write({ message: "entered the chat" });

  call.on("data", (chunk) => {
    console.log(`${chunk.username} ==> ${chunk.message}`);
  });

  rl.on("line", (line) => {
    if (line === "quit") call.end();
    call.write({ message: line });
  });
}
