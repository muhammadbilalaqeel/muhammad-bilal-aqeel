const notifications = [
  {
    id: "notif_001",
    actor: {
      id: "user_001",
      name: "Mark Webber",
      avatar: "./assets/avatar-mark-webber.webp",
    },
    type: "reaction",
    target: {
      type: "post",
      id: "post_123",
      title: "My first tournament today!",
      thumbnail: null,
    },
    createdAt: "2025-08-04T14:45:00Z",
    read: false,
    metadata: {
      message: null,
      image: null,
      groupName: null,
    },
  },
  {
    id: "notif_002",
    actor: {
      id: "user_002",
      name: "Angela Gray",
      avatar: "./assets/avatar-angela-gray.webp",
    },
    type: "follow",
    target: null,
    createdAt: "2025-08-04T14:40:00Z",
    read: false,
    metadata: {},
  },
  {
    id: "notif_003",
    actor: {
      id: "user_003",
      name: "Jacob Thompson",
      avatar: "./assets/avatar-jacob-thompson.webp",
    },
    type: "group_join",
    target: {
      type: "group",
      id: "group_001",
      title: "Chess Club",
    },
    createdAt: "2025-08-04T12:00:00Z",
    read: false,
    metadata: {},
  },
  {
    id: "notif_004",
    actor: {
      id: "user_004",
      name: "Rizky Hasanuddin",
      avatar: "./assets/avatar-rizky-hasanuddin.webp",
    },
    type: "message",
    target: null,
    createdAt: "2025-07-31T10:00:00Z",
    read: true,
    metadata: {
      message:
        "Hello, thanks for setting up the Chess Club. I've been a member for a few weeks now and I'm already having lots of fun and improving my game.",
    },
  },
  {
    id: "notif_005",
    actor: {
      id: "user_005",
      name: "Kimberly Smith",
      avatar: "./assets/avatar-kimberly-smith.webp",
    },
    type: "comment",
    target: {
      type: "post",
      id: "post_777",
      thumbnail: "./assets/image-chess.webp",
    },
    createdAt: "2025-07-28T09:30:00Z",
    read: true,
    metadata: {},
  },
  {
    id: "notif_006",
    actor: {
      id: "user_006",
      name: "Nathan Peterson",
      avatar: "./assets/avatar-nathan-peterson.webp",
    },
    type: "reaction",
    target: {
      type: "post",
      id: "post_888",
      title: "5 end-game strategies to increase your win rate",
    },
    createdAt: "2025-07-25T14:10:00Z",
    read: true,
    metadata: {},
  },
  {
    id: "notif_007",
    actor: {
      id: "user_007",
      name: "Anna Kim",
      avatar: "./assets/avatar-anna-kim.webp",
    },
    type: "left_group",
    target: {
      type: "group",
      id: "group_001",
      title: "Chess Club",
    },
    createdAt: "2025-07-23T13:00:00Z",
    read: true,
    metadata: {},
  },
];

// let notifications = [
//   {
//     userImage: "./assets/avatar-mark-webber.webp",
//     userName: "Mark Webber",
//     userAction: "reacted",
//     timeOfAction: "1m",
//     read: false,
//     actionOn: "post",
//     postName: "My first tournament today!",
//   },
//   {
//     userImage: "./assets/avatar-angela-gray.webp",
//     userName: "Angela Gray",
//     userAction: "follow",
//     timeOfAction: "5m",
//     read: false,
//   },
//   {
//     userImage: "./assets/avatar-jacob-thompson.webp",
//     userName: "Jacob Thompson",
//     userAction: "groupJoin",
//     timeOfAction: "1 day",
//     read: false,
//     actionOn: "group",
//     groupName: "Chess Club",
//   },
//   {
//     userImage: "./assets/avatar-rizky-hasanuddin.webp",
//     userName: "Rizky Hasanuddin",
//     userAction: "sendMsg",
//     timeOfAction: "5 days",
//     read: true,
//     message:
//       "  Hello, thanks for setting up the Chess Club. I've been a member for a few weeks now and I'm already having lots of fun and improving my game.",
//   },
//   {
//     userImage: "./assets/avatar-kimberly-smith.webp",
//     userName: "Kimberly Smith",
//     userAction: "comment",
//     timeOfAction: "1 week",
//     read: true,
//     actionOn: "post",
//     postImg: "./assets/image-chess.webp",
//   },
//   {
//     userImage: "./assets/avatar-nathan-peterson.webp",
//     userName: "Nathan Peterson",
//     userAction: "reacted",
//     timeOfAction: "2 weeks",
//     read: true,
//     actionOn: "post",
//     postName: "5 end-game strategies to increase your win rate",
//   },
//   {
//     userImage: "./assets/avatar-anna-kim.webp",
//     userName: "Anna Kim",
//     userAction: "leftGroup",
//     timeOfAction: "2 weeks",
//     read: true,
//     actionOn: "group",
//     groupName: "Chess Club",
//   },
// ];

let notificationsElem = document.getElementById("notifications");

function populateData(data = notifications) {
  notificationsElem.innerHTML = "";
  console.log(notifications);
  if(data.length > 0){
    data.forEach((elem, i) => {
    let p = "";
    if (elem.type == "reaction") {
      p = `<p>  <span class="name">${
        elem.actor.name
      }</span> reacted to your recent post <span class="post"> ${
        elem.target.title
      }</span> ${elem.read ? "" : '<span class="unread-circle"></span>'}</p>`;
    }

    if (elem.type === "message") {
      p = `<p>  <span class="name">${
        elem.actor.name
      }</span> sent you a private message ${
        elem.read ? "" : '<span class="unread-circle"></span>'
      }</p>`;
    }

    if (elem.type === "follow") {
      p = `<p>  <span class="name">${elem.actor.name}</span> followed you ${
        elem.read ? "" : '<span class="unread-circle"></span>'
      }</p>`;
    }

    if (elem.type === "group_join") {
      p = `<p>  <span class="name">${
        elem.actor.name
      }</span> has joined your group <span class="group"> ${
        elem.target.title
      }</span> ${elem.read ? "" : '<span class="unread-circle"></span>'}</p>`;
    }

    if (elem.type === "left_group") {
      p = `<p>  <span class="name">${
        elem.actor.name
      }</span> left the group group <span class="group"> ${
        elem.target.title
      }</span> ${elem.read ? "" : '<span class="unread-circle"></span>'}</p>`;
    }

    if (elem.type === "comment") {
      p = `<p>  <span class="name">${
        elem.actor.name
      }</span> commented on your picture  ${
        elem.read ? "" : '<span class="unread-circle"></span>'
      }</p>`;
    }

    notificationsElem.innerHTML += `
    <li class="notification relative ${
      elem.type == "message" ? "bg-white" : ""
    } ${elem.read ? "" : "cursor-pointer"}" ${
      elem.type !== "message" ? `onclick=" makeRead(${i})"` : "onclick='toggleBar()'"
    } ${elem.type == "message" ? 'id="mli"' : ""}>
                  <div class="flex  sm:gap-3 n ${elem.read ? "" : "unread"}">
                  <div class="img">
                     <img src=${elem.actor.avatar} alt=${elem.actor.name}>
                  </div>
                  <div class="content">
                       ${p}
                       <p>${getShortTimeAgo(elem.createdAt)}</p>
                  </div>
                  ${
                    elem.type === "comment"
                      ? `<div class="cImg"> <img src=${elem.target.thumbnail}> </div>`
                      : ""
                  }
                  ${
                    elem.type === "message"
                      ? `<div class="mImg"> <img src='./assets/down_dark.png'> </div>`
                      : ""
                  }
                  </div>
                  ${
                    elem.type == "message"
                      ? `<div id='m' class='hide'> <p class='msg'>
                    ${elem.metadata.message}
                    </p></div>`
                      : ""
                  }
    </li>
    `;
  });
  }
  else{
    notificationsElem.innerHTML = "<p class='text-center mt-10'>No Items to show</p>";
  }
}

function toggleBar() {
  let mli = document.getElementById("mli");
  let m = document.getElementById("m");
   m.classList.toggle("hide");

   let mImg = document.querySelector('.mImg img');
mImg.classList.toggle('transform');
mImg.classList.toggle('rotate-[180deg]');
}

function getShortTimeAgo(isoString) {
  const inputTime = new Date(isoString);
  const now = new Date();
  const diffMs = now - inputTime;
  const isFuture = diffMs < 0;
  const seconds = Math.floor(Math.abs(diffMs) / 1000);

  let time = "";
  if (seconds < 60) time = `${seconds}s`;
  else {
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) time = `${minutes}m`;
    else {
      const hours = Math.floor(minutes / 60);
      if (hours < 24) time = `${hours}h`;
      else {
        const days = Math.floor(hours / 24);
        if (days < 7) time = `${days}d`;
        else {
          const weeks = Math.floor(days / 7);
          if (weeks < 4) time = `${weeks}w`;
          else {
            const months = Math.floor(weeks / 4.345);
            if (months < 12) time = `${months}mo`;
            else {
              const years = Math.floor(months / 12);
              time = `${years}y`;
            }
          }
        }
      }
    }
  }

  return isFuture ? `in ${time}` : `${time} ago`;
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



function handleClick(i) {
  if (notifications[i].type == "message") {
    toggleBar();
  }
}



// Toggle Button

// const s = document.getElementsByClassName("s")[0];

// s.addEventListener("click", function () {
//   document.documentElement.classList.toggle("dark");
// //   s.classList.toggle("tb");
// });


const filterBtn = document.getElementById("filterBtn");
const filterDropdown = document.getElementById("filterDropdown");

filterBtn.addEventListener("click", () => {
  filterDropdown.classList.toggle("hidden");
});

const filterOptions = document.querySelectorAll("#filterDropdown li");

filterOptions.forEach((option) => {
  option.addEventListener("click", () => {
    const filter = option.getAttribute("data-filter");
    filterNotifications(filter);
    filterDropdown.classList.add("hidden"); 
  });
});


function filterNotifications(type) {
  const filtered =
    type === "all"
      ? notifications
      : notifications.filter((n) => (type === "read" ? n.read : !n.read));

  populateData(filtered);
}
