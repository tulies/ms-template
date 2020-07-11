import axios from "axios";
export function request(url, option) {
  const defaultOptions = {
    method: "GET",
  };
  const options = {
    ...defaultOptions,
    url: `${url}`,
    ...option,
  };
  return new Promise((resolve, reject) => {
    axios
      .request(options)
      .then((res) => {
        resolve(res.data);
      })
      .catch((e) => {
        let res = {};
        if (e.response) {
          res = {
            code: -999,
            msg: "服务连接异常，请稍后再试",
            data: {
              status: e.response.status,
              statusText: e.response.status,
            },
          };
        } else {
          res = {
            code: -999,
            msg: "网络连接失败，请稍后再试",
            data: {
              status: "-999",
              statusText: "网络连接失败，请稍后再试",
            },
          };
        }
        resolve(res);
      });
  });
}

export default request;
