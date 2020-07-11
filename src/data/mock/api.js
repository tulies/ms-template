import Mock from "mockjs";
const Random = Mock.Random;
const url = {
  queryUserList: "/user/queryUserList",
};
// Mock.setup({
//   timeout: 10,
//   // timeout: "50-500",
// });

export default [
  Mock.mock(url.queryUserList, {
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    "list|10": [
      {
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        "id|+1": 1,
        "uid|1000000000-1999999999": 1000000,
        nickname: "@cname",
        username: "@first",
        avatar: "",
        salt: "",
        status: Random.integer(0, 1),
        createTime: "@datetime",
        updateTime: "@datetime",
      },
    ],
    pageSize: 10,
    pageNum: 1,
    total: 123,
  }),
];
// "dataSource|5": [
//   {
//     "id|+1": 1,
//     "mockTitle|1": ["哑巴", "Butter-fly", "肆无忌惮", "摩天大楼", "初学者"],
//     "mockContent|1": [
//       "你翻译不了我的声响",
//       "数码宝贝主题曲",
//       "摩天大楼太稀有",
//       "像海浪撞破了山丘",
//     ],
//     "mockAction|1": ["下载", "试听", "喜欢"],
//   },
// ],
