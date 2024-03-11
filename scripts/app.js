/***** get element by id *****/
const postContainer = document.getElementById("post-container");
const latestContainer = document.getElementById("latest-container");
const loading = document.getElementById('loading');

/***** fetch all post data *****/
const fetchData = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/posts"
  );
  const data = await res.json();
  const { posts } = data;
  posts.forEach((post) => {
    postHandle(
      post.category,
      post.image,
      post.isActive,
      post.title,
      post.posted_time,
      post.description,
      post.author.name,
      post.view_count,
      post.comment_count
    );
  });
};

/***** MarkAsRead button handle *****/
const markAsRead = (title, views) => {
  const readCount = document.getElementById("count-container");
  const countDiv = document.createElement("div");
  countDiv.innerHTML = `<div class="bg-white flex items-center gap-1 p-4 rounded-2xl">
    <div>
      <h3
        class="font-semibold font-mulish leading-[26px] text-[#12132D]"
      >${title}
      </h3>
    </div>
    <div
      class="flex justify-end items-center gap-2 w-1/3 text-[#12132D99]"
    >
      <div><img src="./images/icons/eye.svg" alt="views icon" /></div>
      <div>${views}</div>
    </div>
  </div>`;
  readCount.appendChild(countDiv);
  markReadCount();
};

/***** mark as read count *****/
const markReadCount = () => {
  const marksContainer = document.getElementById("marks-reads");
  let countText = marksContainer.innerText;
  const countValue = parseInt(countText) + 1;
  marksContainer.innerText = countValue;
};
/***** search functional handle*****/
const searchHandle = () => {
  showLoading();
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  const searchFetch = () => fetchBySearch(searchText);
  /***** loading time set *****/
  setTimeout(searchFetch, 2000);
};
/***** fetch data by search category *****/
const fetchBySearch = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`
  );
  const data = await res.json();
  const { posts } = data;
  console.log(data);
  hideLoading();
  postContainer.innerHTML = "";
  posts.forEach((post) => {
    postHandle(
      post.category,
      post.image,
      post.isActive,
      post.title,
      post.posted_time,
      post.description,
      post.author.name,
      post.view_count,
      post.comment_count
    );
  });
};

/***** fetch latest post data *****/
const latestFetch = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
  );
  const data = await res.json();
  data.forEach((info) => {
    const latestDiv = document.createElement("div");
    latestDiv.innerHTML = `<div class="rounded-3xl lg:w-[400px] w-full bg-base-100 p-4 lg:p-6 border">
    <div class="rounded-[20px] bg-[url('${info.cover_image}')] h-48 bg-cover">
    </div>
    <div class="mt-6">
      <div class="flex items-center gap-2">
        <div><img src="./images/icons/calender.svg" alt="" /></div>
        <h4 class="text-[#12132D99]">${
          info.author.posted_date ? info.author.posted_date : "No publish date"
        }</h4>
      </div>
      <h2 class="my-3 text-lg font-extrabold leading-8">${info.title}</h2>
      <p class="text-[#12132D99]">${info.description}</p>
      <div class="flex items-center gap-4 mt-4">
        <div class="w-11 h-11 rounded-full bg-[url('${
          info.profile_image
        }')] bg-contain"></div>
        <div>
          <h3 class="text-[#12132D] font-bold">${info.author.name}</h3>
          <p class="text-[#12132D99] text-sm">${
            info.author.designation ? info.author.designation : "Unknown"
          }</p>
        </div>
      </div>
    </div>
  </div>`;
    latestContainer.appendChild(latestDiv);
  });
};

/***** post functional added*****/
const postHandle = (category, image, isActive, title, time, description, authorName, view, comment) => {
  let activeSign = null;
  if (isActive) {
    activeSign = 'bg-green-500';
  }
  else {
    activeSign = 'bg-red-500';
  };
  const postDiv = document.createElement('div');
  postDiv.innerHTML = `<div
      class="bg-[#F3F3F5] lg:p-10 p-4 flex flex-col lg:flex-row gap-6 rounded-3xl"
    >
      <!------ author pic ----->
      <div>
        <div class=" w-[72px] h-[72px] relative">
          <div class="overflow-hidden rounded-2xl">
            <div>
              <img
                src="${image}"
                alt=""
              />
            </div>
          </div>
          <div id='active-sign'
            class="${activeSign} w-4 h-4 border-2 border-white rounded-full absolute -right-1 -top-1"
          ></div>
        </div>
      </div>

      <!------ post details ----->
      <div class="w-full">
        <!------ category & author name ----->
        <div
          class="flex gap-5 text-[#12132DCC] font-inter font-medium text-sm"
        >
          <h3># ${category}</h3>
          <h3>Author : <span>${authorName}</span></h3>
        </div>
        <div class="mb-5 mt-3 space-y-4">
          <h3 class="font-mulish text-xl font-bold text-[#12132D]">
            ${title}
          </h3>
          <p class="font-inter text-[#12132D99] leading-[26px]">${description}</p>
        </div>

        <hr class="border-dashed border-[#12132D40]"/>
        <!------ msg views ----->
        <div class="flex justify-between mt-6">
          <div class="flex gap-5">
            <div class="flex gap-3">
              <div><img src="./images/icons/mgs.svg" alt="" /></div>
              <span>${comment
    }</span>
            </div>
            <div class="flex gap-3">
              <div><img src="./images/icons/eye.svg" alt="" /></div>
              <span>${view}</span>
            </div>
            <div class="flex gap-3">
              <div><img src="./images/icons/watch.svg" alt="" /></div>
              <span>${time}</span>
            </div>
          </div>
          <!------ dynamic mgs ----->
          <div class="hover:cursor-pointer" onclick="markAsRead(\`${title}\`, ${view})"><img src="./images/icons/mail.svg" alt="" /></div>
        </div>
      </div>
    </div>`
  postContainer.appendChild(postDiv);
};

/***** Loading handle *****/
const showLoading = () => {
  loading.classList.remove('hidden');
};
const hideLoading = () => {
  loading.classList.add('hidden');
};

fetchData();
latestFetch();
