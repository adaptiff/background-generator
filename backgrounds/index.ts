export default [
  {
    id: 1,
    canvasWidth: 600,
    canvasHeight: 600,
    selectedLayoutId: 1,
    selectedObjectIds: [3],
    configValues: {
      objectSize: 50,
      objectDistance: 50,
      padding: 10,
      withRandomPosition: false,
      randomizePositionStrength: 10
    },
    configColors: {
      backgroundColor: { type: "solid", values: ["#fff", "#ccc"] },
      objectColors: [{ type: "solid", values: ["#000", "#ccc"] }]
    },
    preview: "https://adaptiff.com/thumbs/117.png"
  },
  {
    id: 2,
    canvasWidth: 800,
    canvasHeight: 600,
    selectedLayoutId: 5,
    selectedObjectIds: [3],
    configValues: {
      objectSize: 10,
      explosionForce: 20,
      cellWidth: 78,
      cellPadding: 10,
      maxScale: 4,
      withRotate: false,
      withBlur: false,
      randomizeBlurStrength: 5,
      padding: 10
    },
    configColors: {
      backgroundColor: { type: "solid", values: ["#fff", "#ccc"] },
      objectColors: [{ type: "solid", values: ["#000", "#ccc"] }]
    },
    preview: "https://adaptiff.com/thumbs/118.png"
  }
];
