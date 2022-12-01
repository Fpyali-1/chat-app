const ws = new WebSocket("wss://chat-app.yaliwainstain.repl.co");

const name1 = prompt("enter your name");

let x = 0;

ws.addEventListener("open", () => {
  x = 1;
  var objDiv = document.getElementById("messages-div");
  objDiv.scrollTop = objDiv.scrollHeight;
});
ws.addEventListener("message", (e) => {
  var objDiv = document.getElementById("messages-div");
  objDiv.scrollTop = objDiv.scrollHeight;
  objDiv.innerHTML = "";
  const boxes = document.querySelectorAll(".message");

  boxes.forEach((box) => {
    box.remove();
  });
  var x = eval(e.data);
  x.forEach((element) => {
    if (check_sharir(element)) {
      var y = `
    <div class="message2">
    <p id="message2">
    ${check(element)}
    </p>
    </div>
    `;
    }
    else {
      var y = `
  <div class="message">
  <p>
  ${check(element)}
  </p>
  </div>
  `;
    }
    document.getElementById("messages-div").insertAdjacentHTML("beforeend", y);
  });
});
function send() {
  var y = document.getElementById("input1").value;
  if (y.length < 1) {
    return;
  }

  document.getElementById("input1").value = "";
  y = y.replaceAll('"', "''");
  var x = `"${name1}: ${y}"`;
  ws.send(x);
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
  if (element.includes(name1)) {
    return "message2";
  } else {
    return;
  }
}
