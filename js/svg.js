let svg = (function() {
  function createSVG (modifier) {
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    let iconPath = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    );
    svg.setAttribute("width", modifier.width || "16");
    svg.setAttribute("height", modifier.width || "16");
    svg.setAttribute("viewBox", `0 0 16 16`);
    svg.setAttribute("fill", modifier.color || "currentColor");
    svg.appendChild(iconPath);
    svg.classList.add("bi");
    svg.classList.add(modifier.icon);
    iconPath.setAttribute(
      "d",
      modifier.path
    )
    return svg;
  }

  return {
    create: createSVG
  }
})()

export default svg