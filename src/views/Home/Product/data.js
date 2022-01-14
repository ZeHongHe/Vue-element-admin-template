const tableItem = {
  date: "2022-01-21", // 日期
  name: "李华", // 姓名
  phone: "12345678901", // 电话
  address: "深圳市南山区滨海大道 7 号" // 地址
};
// 此处先以 tableItem 为数据源，拷贝生成 20 个数据，然后再根据索引 index 添加上 id
const tableData = Array(20)
  .fill(tableItem)
  .map((x, i) => {
    return { id: i + 1, ...x };
  });
export default tableData;