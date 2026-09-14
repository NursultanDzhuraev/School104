import { spawn } from "node:child_process";
import { setTimeout } from "node:timers/promises";
const child=spawn(process.execPath,["node_modules/next/dist/bin/next","dev","--hostname","127.0.0.1","--port","3001"],{stdio:"inherit",detached:true});
try {
 let ready=false;
 for(let attempt=0;attempt<40;attempt++){
  if(child.exitCode!==null)throw new Error("Development server exited unexpectedly");
  try {const response=await fetch("http://127.0.0.1:3001/kg",{signal:AbortSignal.timeout(10000)});if(response.ok){const html=await response.text();if(html.includes("104")){ready=true;break;}}}catch{}
  await setTimeout(1000);
 }
 if(!ready)throw new Error("Development route did not become ready");
 console.log("Development server: /kg returned 200 with school content");
} finally {if(child.pid){try{process.kill(-child.pid,"SIGTERM");}catch{child.kill("SIGTERM");}}}
