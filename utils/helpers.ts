export function getColorFromPath(path: string) {
  const base = path.split("/")[1];
  switch (base) {
    case "tricks":
      return "cyan";
    case "categories":
      return "orange";
    case "transitions":
      return "pink";
    case "landingstances":
      return "red";
    default:
      return "purple";
  }
}