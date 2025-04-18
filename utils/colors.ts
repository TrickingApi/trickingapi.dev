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

export function getRandomDraculaColor() {
  const colors = [
    "#ff79c6",
    "#bd93f9",
    "#50fa7b",
    "#ffb86c",
    "#8be9fd",
    "#ff5555",
    "#f1fa8c",
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}
