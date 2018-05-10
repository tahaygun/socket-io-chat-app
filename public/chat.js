// Make connection
var socket = io.connect();

// Query DOM
var message = document.getElementById("message"),
  handle = document.getElementById("handle"),
  btn = document.getElementById("send"),
  output = document.getElementById("output"),
  feedback = document.getElementById("feedback");
form = document.getElementById("myform");
//time function
function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}
// Emit events
socket.emit("users", () => {
  users: "don";
});
form.addEventListener("submit", e => {
  e.preventDefault();
  if (handle.value === "") {
    return handle.setAttribute("placeholder", "Please write your name!");
  }
  if (message.value === "") {
    return message.setAttribute("placeholder", "Message cannot be empty!");
  }
  socket.emit("chat", {
    message: message.value,
    handle: handle.value
  });
  $("#handle").hide();
  message.setAttribute("placeholder", "Message");
  handle.setAttribute("disabled", true);
  message.value = "";
});

message.addEventListener("keypress", () => {
  socket.emit("typing", handle.value);
});

//to keep scroll bar on bottom

// Listen for events
socket.on("chat", data => {
  var date = formatAMPM(new Date());
  feedback.innerHTML = "";
  output.innerHTML +=
    "<p class='messagetext' ><strong>" +
    data.handle +
    ": </strong>" +
    data.message +
    " " +
    "<span class='time' >" +
    date +
    "</span></p>";
  $("#chat-window").scrollTop($("#chat-window")[0].scrollHeight);
});
socket.on("typing", data => {
  feedback.innerHTML = "<p><em>" + data + " is typing...</em></p>";
});
socket.on("users", data => {
  $("#users").html(data);
});
