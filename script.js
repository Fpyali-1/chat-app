const ws = new WebSocket("wss://chat-app.yaliwainstain.repl.co");

const name1 = prompt("enter your name");

let x = 0;

ws.addEventListener("open", () => {
  x = 1;
});
ws.addEventListener("message", (e) => {
  const boxes = document.querySelectorAll(".message");

  boxes.forEach((box) => {
    box.remove();
  });
  console.log(e.data);
  var x = eval(e.data);
  document.getElementById("messages").innerHTML = "";
  x.forEach((element) => {
    console.log(element);
    var y = `
  <div class="message">
  <p>
  ${check(element)}
  </p>
  </div>
  `;
    document.body.insertAdjacentHTML("beforeend", y);
  });
});
function send() {
  ws.send(`"${name1}: ${document.getElementById("input1").value}"`);
  document.getElementById("input1").value = "";
  //ws.send()
}
addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    send();
  }
});
function check(data) {
  if ((data[0] == "*") & (data[data.length] == "*")) {
    var x = data.replaceAll("*", "");
    x = "<h1>" + x + "</h1>";
    return x;
  } else {
    return data;
  }
}
