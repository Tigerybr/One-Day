var name = "";

var time = 0;

var dailyroutine = ["Breakfast", "Lunch", "Dinner", "Shower"];
var entertainment = ["Netflix", "Party", "Video games", "Chat with friends"];
var exercise = ["Basketball", "Football", "Anaerobic", "Yoga", "Jogging"];
var learning = ["Classes", "Reading", "Doing homework", "Group work"];
var alllocation = ["Home", "Gym", "School", "Friend's place"];

var actionarray = [];
var actionlocation = [];
var actiontime = [];
var transtime = [0, 0, 0, 0, 0, 0];
var priority = [];

var path = [];
var priorityOP = [];

function page1submit()
{
  document.getElementById("page1").classList.add("d-none");
  var fname = document.getElementById("name").value;
  name = fname;
  applyname();
  document.getElementById("page2").classList.remove("d-none");
}

function applyname()
{
  document.getElementById("page2title").innerHTML = "<h1>" + name + "'s day :D</h1>";
  document.getElementById("page2morning").innerHTML = "<h3>" + name + " woke up and went to:</h3>";
  document.getElementById("page2noon").innerHTML = "<h3>Before noon, " + name + " did:</h3>";
  document.getElementById("page2after").innerHTML = "<h3>It's a wonderful afternoon. What's " + name + " up to?</h3>";
  document.getElementById("page2night").innerHTML = "<h3>Night drew in, " + name + " decided to:</h3>";
}

function settime(i)
{
  time = i;
}

function updateselect()
{
  var i = document.getElementById("actioninput").value;
  var s = "";
  if(i == 1)
  {
    s += "<option value='1'>Breakfast</option>";
    s += "<option value='2'>Lunch</option>";
    s += "<option value='3'>Dinner</option>";
    s += "<option value='4'>Shower</option>";
  }
  else if(i == 2)
  {
    s += "<option value='1'>Netflix</option>";
    s += "<option value='2'>Party</option>";
    s += "<option value='3'>Video games</option>";
    s += "<option value='4'>Chat with friends</option>";
  }
  else if(i == 3)
  {
    s += "<option value='1'>Basketball</option>";
    s += "<option value='2'>Football</option>";
    s += "<option value='3'>Anaerobic</option>";
    s += "<option value='4'>Yoga</option>";
    s += "<option value='5'>Jogging</option>";
  }
  else if(i == 4)
  {
    s += "<option value='1'>Classes</option>";
    s += "<option value='2'>Reading</option>";
    s += "<option value='3'>Doing homework</option>";
    s += "<option value='4'>Group work</option>";
  }
  else{}
  document.getElementById("actioninput2").innerHTML = s;
}

function addaction()
{
  var i = document.getElementById("actioninput").value;
  var j = document.getElementById("actioninput2").value - 1;
  var s = "<button type='button' class='btn btn-lg btn-primary' disabled>";
  if(i == 1)
  {
    s += dailyroutine[j];
    actionarray.push(dailyroutine[j]);
  }
  else if(i == 2)
  {
    s += entertainment[j];
    actionarray.push(entertainment[j]);
  }
  else if(i == 3)
  {
    s += exercise[j];
    actionarray.push(exercise[j]);
  }
  else if(i == 4)
  {
    s += learning[j];
    actionarray.push(learning[j]);
  }
  else{}
    s += "</button>";
  var timeid = "time" + time;
  document.getElementById(timeid).innerHTML += s;
}

function resetpage2()
{
  for(var i = 1; i <= 4; i ++)
  {
    document.getElementById("time" + i).innerHTML = "";
  }
  actionarray = [];
}

function page2submit()
{
  page3display();
  document.getElementById("page2").classList.add("d-none");
  document.getElementById("page3").classList.remove("d-none");
}

function page3display()
{
  var s = "";
  var sstart = "<tr><td>";
  var send = "</td></tr>";
  for(var i = 0; i < actionarray.length; i ++)
  {
    s += (sstart + actionarray[i] + send);
  }
  document.getElementById("actionsdisplay").innerHTML = s;
}

function back2page2()
{
  document.getElementById("page3").classList.add("d-none");
  document.getElementById("page2").classList.remove("d-none");
}

function page3submit()
{
  page4display();
  document.getElementById("page3").classList.add("d-none");
  document.getElementById("page4").classList.remove("d-none");
}

function page4display()
{
  var s = "";
  var sstart = "<tr><td>";
  var send = "</td><td><select class='form-control' id='location";
  var sendend = "'><option value='1'>Home</option><option value='2'>Gym</option><option value='3'>School</option><option value='4'>Friend's place</option></select></td><td><select class='form-control' id='timetime";
  var sendendend = "'><option value='15'>15</option><option value='30'>30</option><option value='60'>60</option><option value='90'>90</option><option value='120'>120</option></select></td></tr>"
  for(var i = 0; i < actionarray.length; i ++)
  {
    s += (sstart + actionarray[i] + send + i + sendend + i + sendendend);
  }
  document.getElementById("timelocation").innerHTML = s;
}

function page4submit()
{
  page5display();
  document.getElementById("page4").classList.add("d-none");
  document.getElementById("page5").classList.remove("d-none");
}

function page5display()
{
  // read action location
  actionlocation = [];
  for(var i = 0; i < actionarray.length; i ++)
  {
    actionlocation.push(alllocation[document.getElementById("location" + i).value - 1]);
  }
  // read action time
  actiontime = [];
  for(var i = 0; i < actionarray.length; i ++)
  {
    actiontime.push(document.getElementById("timetime" + i).value);
  }
  // read trasition time
  for(var i = 0; i < 6; i ++)
  {
    var t = parseInt(document.getElementById("ttt" + i).value);
    if(t < 0)
    {
      transtime[i] = 0;
    }
    else
    {
      transtime[i] = t;
    }
  }
  // set priority
  for(var i = 0; i < actionarray.length; i ++)
  {
    priority.push(i);
  }
  // page
  document.getElementById("page5title").innerHTML = "<h1>Try to rearrange the order so that " + name + " spent minimum time:</h1>";
  var s = "";
  var sbuttonup1 = "<button type='button' class='btn btn-primary' onclick='up(";
  var sbuttonup2 = ")'>↑</button>";
  var sbuttondown1 = "<button type='button' class='btn btn-primary' onclick='down(";
  var sbuttondown2 = ")'>↓</button>";
  var s2 = "</td><td>";

  for(var i = 0; i < actionarray.length; i ++)
  {
    s += ("<tr><td>" + (i + 1) + "</td><td id='A" + i + "'>" + actionarray[i] + s2);
    if(i != 0)
    {
      s += (sbuttonup1 + i + sbuttonup2);
    }
    s += s2;
    if(i != (actionarray.length - 1))
    {
      s += (sbuttondown1 + i + sbuttondown2);
    }
    s += "</td></tr>";
  }
  document.getElementById("activityorder").innerHTML = s;
}

function back2page4()
{
  document.getElementById("page5").classList.add("d-none");
  document.getElementById("page4").classList.remove("d-none");
}

function up(i)
{
  var tem = priority[i];
  priority[i] = priority[i - 1];
  priority[i - 1] = tem;
  var s = document.getElementById("A" + i).innerHTML;
  document.getElementById("A" + i).innerHTML = document.getElementById("A" + (i - 1)).innerHTML;
  document.getElementById("A" + (i - 1)).innerHTML = s;
}

function down(i)
{
  var tem = priority[i];
  priority[i] = priority[i + 1];
  priority[i + 1] = tem;
  var s = document.getElementById("A" + i).innerHTML;
  document.getElementById("A" + i).innerHTML = document.getElementById("A" + (i + 1)).innerHTML;
  document.getElementById("A" + (i + 1)).innerHTML = s;
  console.log(priority);
}

function page5submit()
{
  document.getElementById("page6title").innerHTML = "<h1>This is " + name + "'s day.";
  var totaltime = 0;
  // display table
  var s = "";
  var previous;
  for(var i = 0; i < priority.length; i ++)
  {
    var j = priority[i];
    var currentlocation = actionlocation[j];
    // first line
    if(i != 0 && previous != currentlocation){
      s += ("<tr><td>Moving</td><td>to</td><td>" + currentlocation + "</td><td>took</td><td>");
      var t = parseInt(movingtime(previous, currentlocation));
      s += (t + "</td></tr>");
      totaltime += t;
    }
    s += ("<tr><td>" + actionarray[j] + "</td><td>at</td><td>" + currentlocation + "</td><td>took</td><td>");
    var tt = actiontime[j];
    s += (tt + "</td></tr>");
    totaltime += parseInt(tt);
    previous = currentlocation;
  }
  document.getElementById("calendar").innerHTML = s;
  document.getElementById("page6time").innerHTML = "<h1>It took " + name + " " + totaltime + " minutes to accomplish all the activities.</h1>"
  document.getElementById("page5").classList.add("d-none");
  document.getElementById("page6").classList.remove("d-none");
}

function movingtime(l1, l2)
{
  var a = alllocation.indexOf(l1);
  var b = alllocation.indexOf(l2);
  var c = Math.min(a, b);
  var d = Math.max(a, b);
  var res;
  if(c == 0 && d == 1){ // home - gym
    res = transtime[0];
  }
  if(c == 0 && d == 2){ // home - school
    res = transtime[1];
  }
  if(c == 0 && d == 3){ // home - friend
    res = transtime[2];
  }
  if(c == 1 && d == 2){ // gym - school
    res = transtime[3];
  }
  if(c == 1 && d == 3){ // gym - friend
    res = transtime[4];
  }
  if(c == 2 && d == 3){ // school - friend
    res = transtime[5];
  }
  return res;
}

function page6to1()
{
  document.getElementById("page6").classList.add("d-none");
  document.getElementById("page1").classList.remove("d-none");
}

function page6to4()
{
  document.getElementById("page6").classList.add("d-none");
  document.getElementById("page4").classList.remove("d-none");
}

function checksolution()
{
  solve();
  var totaltime = 0;
  // display table
  var s = "";
  var previous;
  for(var i = 0; i < priorityOP.length; i ++)
  {
    var j = priorityOP[i];
    var currentlocation = actionlocation[j];
    // first line
    if(i != 0 && previous != currentlocation){
      s += ("<tr><td>Moving</td><td>to</td><td>" + currentlocation + "</td><td>took</td><td>");
      var t = parseInt(movingtime(previous, currentlocation));
      s += (t + "</td></tr>");
      totaltime += t;
    }
    s += ("<tr><td>" + actionarray[j] + "</td><td>at</td><td>" + currentlocation + "</td><td>took</td><td>");
    var tt = actiontime[j];
    s += (tt + "</td></tr>");
    totaltime += parseInt(tt);
    previous = currentlocation;
  }
  document.getElementById("calendaroptimal").innerHTML = s;
  document.getElementById("page7time").innerHTML = "<h1>It took " + name + " " + totaltime + " minutes to accomplish all the activities.</h1>"
  document.getElementById("page6").classList.add("d-none");
  document.getElementById("page7").classList.remove("d-none");
}

function solve()
{
  path = [];
  allpath = [[0, 1, 2, 3], [0, 1, 3, 2], [0, 2, 1, 3], [0, 2, 3, 1], [0, 3, 1, 2], [0, 3, 2, 1],
             [1, 0, 2, 3], [1, 0, 3, 2], [1, 2, 0, 3], [1, 2, 3, 0], [1, 3, 0, 2], [1, 3, 2, 0],
             [2, 0, 1, 3], [2, 0, 3, 1], [2, 1, 0, 3], [2, 1, 3, 0], [2, 3, 0, 1], [2, 3, 1, 0],
             [3, 0, 1, 2], [3, 0, 2, 1], [3, 1, 0, 2], [3, 1, 2, 0], [3, 2, 0, 1], [3, 2, 1, 0]];
  var totaltime = Infinity;
  for(var i = 0; i < 24; i ++)
  {
    var currenttime = 0;
    currenttime += movingtime(alllocation[allpath[i][0]], alllocation[allpath[i][1]]);
    currenttime += movingtime(alllocation[allpath[i][1]], alllocation[allpath[i][2]]);
    currenttime += movingtime(alllocation[allpath[i][2]], alllocation[allpath[i][3]]);
    if(currenttime < totaltime)
    {
      totaltime = currenttime;
      path = allpath[i];
    }
  }
  priorityOP = [];
  for(var i = 0; i < 4; i ++)
  {
    var l = alllocation[path[i]];
    for(var j = 0; j < actionlocation.length; j ++)
    {
      if(actionlocation[j] == l)
      {
        priorityOP.push(j);
      }
    }
  }
}

function page7to6()
{
  document.getElementById("page7").classList.add("d-none");
  document.getElementById("page6").classList.remove("d-none");
}