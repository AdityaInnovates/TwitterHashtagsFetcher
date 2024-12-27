var config = {
  mode: "fixed_servers",
  rules: {
    singleProxy: {
      scheme: "http",
      host: "us-ca.proxymesh.com", //Your proxy hostname
      port: 31280, //Your proxy Port
    },
    bypassList: ["localhost"],
  },
};

chrome.proxy.settings.set({ value: config, scope: "regular" }, function () {});

function callbackFn(details) {
  return {
    authCredentials: {
      username: "<Your_proxy_username>",
      password: "<Your_proxy_password>",
    },
  };
}

chrome.webRequest.onAuthRequired.addListener(
  callbackFn,
  { urls: ["<all_urls>"] },
  ["blocking"]
);
