export default [
  {
    id: 1,
    canvasWidth: 600,
    canvasHeight: 600,
    selectedLayoutId: 7,
    selectedObjectIds: [1],
    configValues: { objectSize: 20, objectDistance: 50, padding: 10 },
    configColors: {
      backgroundColor: {
        type: "linear",
        values: [
          { r: 255, g: 255, b: 255, a: 1 },
          { r: 250, g: 229, b: 255, a: 1 }
        ],
        angle: 44
      },
      objectColors: [
        { type: "linear", values: ["#A18CD1", "#FBC2EB"], angle: 27 },
        { type: "linear", values: ["#FAD0C4", "#FFD1FF"], angle: 0 },
        { type: "linear", values: ["#D4FC79", "#96E6A1"], angle: 0 }
      ]
    }
  },
  {
    id: 2,
    canvasWidth: 600,
    canvasHeight: 600,
    selectedLayoutId: 5,
    selectedObjectIds: [-1],
    configValues: {
      objectSize: 20,
      explosionForce: 13,
      cellWidth: 100,
      cellPadding: 4,
      maxScale: 4,
      withRotate: false,
      withBlur: true,
      randomizeBlurStrength: 13,
      padding: 10
    },
    configColors: {
      backgroundColor: {
        type: "linear",
        values: ["#FF9A9E", "#FAD0C4"],
        angle: -92
      },
      objectColors: [{ type: "solid", values: ["#000", "#ccc"] }]
    },
    uploadedObjects: [
      {
        id: -1,
        src: "🔥",
        type: "emoji"
      }
    ]
  },
  {
    id: 3,
    canvasWidth: 600,
    canvasHeight: 600,
    selectedLayoutId: 5,
    selectedObjectIds: [5],
    configValues: {
      objectSize: 16,
      explosionForce: 30,
      cellWidth: 78,
      cellPadding: 10,
      maxScale: 4.8,
      withRotate: false,
      withBlur: true,
      randomizeBlurStrength: 12,
      padding: 10
    },
    configColors: {
      backgroundColor: {
        type: "linear",
        values: ["#A18CD1", { r: 252, g: 186, b: 255, a: 1 }],
        angle: -60,
        xShift: 0,
        yShift: 0
      },
      objectColors: [
        { type: "linear", values: ["#FFECD2", "#FCB69F"], angle: 0 },
        { type: "linear", values: ["#fedfe7", "#e9e5f4"], angle: 0 }
      ]
    }
  },
  {
    id: 4,
    canvasWidth: 600,
    canvasHeight: 600,
    selectedLayoutId: 4,
    selectedObjectIds: [2, 5],
    configValues: {
      objectSize: 50,
      itemMargin: 81,
      figureMargin: 26,
      figureRotate: 152,
      figureAngles: 3,
      sizeDecrement: 13,
      padding: 10
    },
    configColors: {
      backgroundColor: {
        type: "linear",
        values: [
          { r: 255, g: 206, b: 220, a: 1 },
          { r: 224, g: 214, b: 255, a: 1 }
        ],
        angle: -112,
        xShift: 0,
        yShift: 0
      },
      objectColors: [
        {
          type: "linear",
          values: [
            { r: 255, g: 255, b: 255, a: 1 },
            { r: 212, g: 218, b: 255, a: 1 }
          ],
          angle: 0
        }
      ]
    }
  },
  {
    id: 5,
    canvasWidth: 600,
    canvasHeight: 600,
    selectedLayoutId: 1,
    selectedObjectIds: [6],
    configValues: {
      objectSize: 33,
      objectDistance: 50,
      padding: 10,
      withRandomPosition: false,
      randomizePositionStrength: 10,
      withRotate: false
    },
    configColors: {
      backgroundColor: {
        type: "linear",
        values: ["#FAD0C4", "#FFD1FF"],
        angle: 0
      },
      objectColors: [
        { type: "linear", values: ["#FFECD2", "#FCB69F"], angle: 0 }
      ]
    }
  }
];
