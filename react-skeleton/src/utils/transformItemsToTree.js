export default function itemsToTree(items) {
  let list = [];
  items.sort((prev, next) => {
    return prev._id - next._id;
  });
  items.map(item => {
    let key = item.parent;
    if (key == null) {
      key = 0;
    }
    list[key] = items.filter(el => el.parent == item.parent);
  });
  return list;
}