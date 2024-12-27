var config = {
  mode: "fixed_servers",
  rules: {
    singleProxy: {
      scheme: "http",
      host: "us-ca.proxymesh.com",
      port: 31280,
    },
    bypassList: ["localhost"],
  },
};

chrome.proxy.settings.set({ value: config, scope: "regular" }, function () {});

function callbackFn(details) {
  return {
    authCredentials: {
      username: "<your_ProxyMesh_Username>",
      password: "<Your_ProxyMesh_Password>",
    },
  };
}

chrome.webRequest.onAuthRequired.addListener(
  callbackFn,
  { urls: ["<all_urls>"] },
  ["blocking"]
);
