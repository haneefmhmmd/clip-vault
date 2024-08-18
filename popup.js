document.addEventListener("DOMContentLoaded", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id },
        function: retrieveStorageData,
      },
      (results) => {
        const storageData = results[0].result;
        const mainContainer = document.getElementById("cv-container");
        const localStorageContent = document.getElementById(
          "localStorageContent"
        );
        const sessionStorageContent = document.getElementById(
          "sessionStorageContent"
        );

        const localStorageItems = Object.keys(storageData.localStorage);
        const sessionStorageItems = Object.keys(storageData.sessionStorage);

        if (localStorageItems.length != 0) {
          mainContainer.classList.remove("no-local-storage");
          localStorageItems.forEach((key) => {
            const div = document.createElement("div");
            div.className = "storage-item";
            div.innerHTML+=`
            <span>${key}: ${storageData.localStorage[key]}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" class="icon-md-heavy"><path fill="currentColor" fill-rule="evenodd" d="M7 5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-2v2a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h2zm2 2h5a3 3 0 0 1 3 3v5h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-9a1 1 0 0 0-1 1zM5 9a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1z" clip-rule="evenodd"></path></svg>
            `
            div.addEventListener("click", () => {
              copyToClipboard(storageData.localStorage[key]);
            });
            localStorageContent.appendChild(div);
          });
        } else {
          mainContainer.classList.add("no-local-storage");
        }

        if (sessionStorageItems.length != 0) {
          mainContainer.classList.remove("no-session-storage");
          sessionStorageItems.forEach((key) => {
            const div = document.createElement("div");
            div.className = "storage-item";
            div.innerHTML+=`
            <span>${key}: ${storageData.localStorage[key]}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" class="icon-md-heavy"><path fill="currentColor" fill-rule="evenodd" d="M7 5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-2v2a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h2zm2 2h5a3 3 0 0 1 3 3v5h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-9a1 1 0 0 0-1 1zM5 9a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1z" clip-rule="evenodd"></path></svg>
            `
            div.addEventListener("click", () => {
              copyToClipboard(storageData.sessionStorage[key]);
            });
            sessionStorageContent.appendChild(div);
          });
        } else {
          mainContainer.classList.add("no-session-storage");
        }
      }
    );
  });
});

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert("Copied to clipboard");
  });
}

function retrieveStorageData() {
  return {
    localStorage: { ...localStorage },
    sessionStorage: { ...sessionStorage },
  };
}
