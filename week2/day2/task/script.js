let notifications = [
  {
    userImage: "./assets/avatar-mark-webber.webp",
    userName: "Mark Webber",
    userAction: "reacted",
    timeOfAction: "1m",
    read: false,
    actionOn: "post",
    postName: "My first tournament today!",
  },
  {
    userImage: "./assets/avatar-angela-gray.webp",
    userName: "Angela Gray",
    userAction: "follow",
    timeOfAction: "5m",
    read: false,
  },
  {
    userImage: "./assets/avatar-jacob-thompson.webp",
    userName: "Jacob Thompson",
    userAction: "groupJoin",
    timeOfAction: "1 day",
    read: false,
    actionOn: "group",
    groupName: "Chess Club",
  },
  {
    userImage: "./assets/avatar-rizky-hasanuddin.webp",
    userName: "Rizky Hasanuddin",
    userAction: "sendMsg",
    timeOfAction: "5 days",
    read: true,
    message:
      "  Hello, thanks for setting up the Chess Club. I've been a member for a few weeks now and I'm already having lots of fun and improving my game.",
  },
  {
    userImage: "./assets/avatar-kimberly-smith.webp",
    userName: "Kimberly Smith",
    userAction: "comment",
    timeOfAction: "1 week",
    read: true,
    actionOn: "post",
    postImg: "./assets/image-chess.webp",
  },
  {
    userImage: "./assets/avatar-nathan-peterson.webp",
    userName: "Nathan Peterson",
    userAction: "reacted",
    timeOfAction: "2 weeks",
    read: true,
    actionOn: "post",
    postName: "5 end-game strategies to increase your win rate",
  },
  {
    userImage: "./assets/avatar-anna-kim.webp",
    userName: "Anna Kim",
    userAction: "leftGroup",
    timeOfAction: "2 weeks",
    read: true,
    actionOn: "group",
    groupName: "Chess Club",
  },
];

let notificationsElem = document.getElementById("notifications");

function populateData() {
  notificationsElem.innerHTML = "";
  notifications.forEach((elem, i) => {
    let p = "";
    if (elem.userAction == "reacted") {
      p = `<p>  <span class="name">${
        elem.userName
      }</span> reacted to your recent post <span class="post"> ${
        elem.postName
      }</span> ${elem.read ? "" : '<span class="unread-circle"></span>'}</p>`;
    }

    if (elem.userAction === "sendMsg") {
      p = `<p>  <span class="name">${
        elem.userName
      }</span> sent you a private message ${
        elem.read ? "" : '<span class="unread-circle"></span>'
      }</p>`;
    }

    if (elem.userAction === "follow") {
      p = `<p>  <span class="name">${elem.userName}</span> followed you ${
        elem.read ? "" : '<span class="unread-circle"></span>'
      }</p>`;
    }

    if (elem.userAction === "groupJoin") {
      p = `<p>  <span class="name">${
        elem.userName
      }</span> has joined your group <span class="group"> ${
        elem.groupName
      }</span> ${elem.read ? "" : '<span class="unread-circle"></span>'}</p>`;
    }

    if (elem.userAction === "leftGroup") {
      p = `<p>  <span class="name">${
        elem.userName
      }</span> left the group group <span class="group"> ${
        elem.groupName
      }</span> ${elem.read ? "" : '<span class="unread-circle"></span>'}</p>`;
    }

    if (elem.userAction === "comment") {
      p = `<p>  <span class="name">${
        elem.userName
      }</span> commented on your picture  ${
        elem.read ? "" : '<span class="unread-circle"></span>'
      }</p>`;
    }

    notificationsElem.innerHTML += `
    <li class="notification ${elem.read ? '':'cursor-pointer'}" onclick="makeRead(${i})">
                  <div class="flex  sm:gap-3 n ${elem.read ? "" : "unread"}">
                  <div class="img">
                     <img src=${elem.userImage} alt=${elem.userName}>
                  </div>
                  <div class="content">
                       ${p}
                       <p>1m ago</p>
                  </div>
                  ${
                    elem.userAction === "comment"
                      ? `<div class="cImg"> <img src=${elem.postImg}> </div>`
                      : ""
                  }
                  </div>
                  ${
                    elem.message
                      ? `<div> <p class='msg'>
                    ${elem.message}
                    </p></div>`
                      : ""
                  }
    </li>
    `;
  });
}

populateData();

let count = document.getElementById("count");

let notificationElem = document.querySelectorAll("#notifications li");

function makeRead(index) {
  if (!notifications[index].read) {
    notifications[index].read = true;
    populateData();
    countUnread();
  }
}

function countUnread() {
  let c = 0;
  notifications.forEach((elem) => {
    if (!elem.read) {
      c++;
    }
  });

  if (c > 0) {
    count.innerHTML = c;
  }
  if (c == 0) {
    count.innerHTML = "";
  }
}

countUnread();

let allRead = document.getElementById("allRead");

allRead.addEventListener("click", function () {
  notifications.forEach((elem) => {
    if (!elem.read) {
      elem.read = true;
    }
  });
  countUnread();
  populateData();
});
