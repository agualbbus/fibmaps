const initialSize = 300;

const properties = function () {
  return {
    trnfrm: {
      rot: {
        x: 0,
        y: 0,
        z: 0,
      },
    },
    width: {
      scale: initialSize,
      percentage: 50,
    },
    show: true,
    locked: false,
  };
};

export default properties;
