import { CIRCLE } from "./consts";

export const degreesToRadians = (degrees: number) => {
  return degrees * (Math.PI / 180);
};

export const makeArcPath = (
  x: number,
  y: number,
  startAngleArg: number,
  endAngleArg: number,
  radius: number
) => {
  let startAngle = startAngleArg;
  let endAngle = endAngleArg;
  if (endAngle - startAngle >= CIRCLE) {
    endAngle = CIRCLE + (endAngle % CIRCLE);
  } else {
    endAngle = endAngle % CIRCLE;
  }
  startAngle = startAngle % CIRCLE;
  const angle =
    startAngle > endAngle
      ? CIRCLE - startAngle + endAngle
      : endAngle - startAngle;

  if (angle >= CIRCLE) {
    return `M${x + radius} ${y} a${radius} ${radius} 0 0 1 0 ${
      radius * 2
    } a${radius} ${radius} 0 0 1 0 ${radius * -2}`;
  }

  const startSine = Math.sin(startAngle);
  const startCosine = Math.cos(startAngle);
  const endSine = Math.sin(endAngle);
  const endCosine = Math.cos(endAngle);

  const arcFlag = angle > Math.PI ? 1 : 0;

  return `M${x + radius * (1 + startSine)} ${
    y + radius - radius * startCosine
  } A${radius} ${radius} 0 ${arcFlag} 1 ${x + radius * (1 + endSine)} ${
    y + radius - radius * endCosine
  }`;
};
