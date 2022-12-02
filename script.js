const ws = new WebSocket("wss://chat-app.yaliwainstain.repl.co");

const name1 = prompt("enter password");
const name2 = prompt("enter your name");
function createserver() {
  let x = prompt("enter a name for your server");
  ws.send(`createserver${x}`)
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
        var y = `
    <p id="message2">
    ${check(element)}
    </p>
    `;
      } else {
        var y = `
  <p id="message">
  ${check(element)}
  </p>
  </div>
  `;
      }
      document
        .getElementById("message-master")
        .insertAdjacentHTML("beforeend", y);
      var objDiv = document.getElementById("message-master");
      objDiv.scrollTop = objDiv.scrollHeight;
    });
  }
  if (e.data.includes("checkpassword")) {
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
  var y = `private message{"password": "${name1}", "message": "${name2}: ${y}"}`;
  ws.send(y);
}
addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    send();
  }
});
function check(data) {
  if (data.split(";").length - 1 > 1) {
    return "<h1>" + data.replaceAll(";", "") + "</h1>";
  } else {
    return data;
  }
}
function check_sharir(element) {
  if (element.includes(name2)) {
    return "message2";
  } else {
    return;
  }
}
