const initialSize = 300;

const properties = () => {
  return {
    trnfrm: {
      rot: {
        x: 0,
        y: 0,
        z: 0,
      },
      axis: {
        x: '71%',
        y: '73.39',
      },
    },
    width: {
      scale: initialSize,
      px: initialSize,
    },
    position: null,
    colors: {
      spiral: {
        rgb: {
          r: 0,
          g: 0,
          b: 0,
          a: 1,
        },
      },
      activeLayerBorder: {
        rgb: {
          r: 208,
          g: 27,
          b: 27,
          a: 1,
        },
      },
    },
    show: true,
    locked: false,
  };
};

export default properties;
