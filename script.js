const ws = new WebSocket("wss://chat-app.yaliwainstain.repl.co");

const name1 = prompt("enter password");
const name2 = prompt("enter your name");

function createserver() {
  let x = prompt("enter a name for your server");
  ws.send(`createserver${x}`);
}

ws.addEventListener("open", () => {
  x = 1;
  var objDiv = document.getElementById("message-master");
  objDiv.scrollTop = objDiv.scrollHeight;
});
ws.addEventListener("message", (e) => {
  console.log(e.data);
  if (e.data.includes("data:")) {
    const boxes = document.querySelectorAll("#message");
    const boxes2 = document.querySelectorAll("#message2");

    boxes.forEach((box) => {
      box.remove();
    });
    boxes2.forEach((box) => {
      box.remove();
    });
    let y = e.data.replace("data:", "");
    console.log(e.data);
    let x = JSON.parse(y);
    x.forEach((element) => {
      if (check_sharir(element)) {
        var y = document.createElement("p");
        y.innerText = element;
        y.id = "message2";
      } else {
        var y = document.createElement("p");
        y.innerText = element;
        y.id = "message";
      }
      var t = document.getElementById("message-master");
      t.append(y);
      var objDiv = document.getElementById("message-master");
      objDiv.scrollTop = objDiv.scrollHeight;
    });
  }
  if (e.data.includes("checkpassword")) {
    if (e.data[0] !== "c") return;
    ws.send(`getdata${name1}`);
    console.log("new message");
    return;
  }
});
function send() {
  var y = document.getElementById("input1").value;
  if (y.length < 1) {
    return;
  }

  document.getElementById("input1").value = "";
  var p = name2 + ":" + " " + y;
  var y = `private message{"password": ${JSON.stringify(
    name1
  )}, "message": ${JSON.stringify(p)}}`;
  ws.send(y);
}
addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    send();
  }
});
function check_sharir(element) {
  if (element.includes(name2)) {
    return "message2";
  } else {
    return;
  }
}
