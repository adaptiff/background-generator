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
        { type: "linear", values: ["#0fd850", "#f9f047"], angle: 0 }
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
      objectSize: 50,
      explosionForce: 13,
      cellWidth: 100,
      cellPadding: 4,
      maxScale: 4,
      withRotate: false,
      withBlur: true,
      randomizeBlurStrength: 13,
      padding: 10,
      withRandomSize: true,
      randomizeSizeStrength: 1.9
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
      withRandomSize: true,
      randomizeSizeStrength: 4.8,
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
  },
  {
    id: 6,
    canvasWidth: 600,
    canvasHeight: 600,
    selectedLayoutId: 4,
    selectedObjectIds: [4, 5, 6],
    configValues: {
      objectSize: 31,
      itemMargin: 70,
      figureMargin: 20,
      figureRotate: 180,
      figureAngles: 3,
      sizeDecrement: 10,
      padding: 10
    },
    configColors: {
      backgroundColor: { type: "solid", values: ["#fff", "#ccc"] },
      objectColors: [
        { type: "linear", values: ["#00f2fe", "#4facfe"], angle: 0 }
      ]
    }
  },
  {
    id: 7,
    canvasWidth: 600,
    canvasHeight: 600,
    selectedLayoutId: 1,
    selectedObjectIds: [-1],
    configValues: {
      objectSize: 50,
      objectDistance: 120,
      padding: 10,
      withRandomSize: true,
      randomizeSizeStrength: 3.3,
      withRandomPosition: true,
      randomizePositionStrength: 36,
      withRotation: false,
      rotationStrength: 45,
      withRandomRotation: true,
      currentRandomSnapshot: 0.15422010095250416,
      withBlur: true,
      blurStrength: 8
    },
    configColors: {
      backgroundColor: { type: "solid", values: ["#101010", "#FFD1FF"] },
      objectColors: [
        { type: "linear", values: ["#009CFF", "#68E24A", "#EDDE42"], angle: 0 }
      ]
    },
    uploadedObjects: [
      {
        id: -1,
        src: "/uploads/1.svg",
        type: "image/svg+xml"
      }
    ]
  },
  {
    id: 8,
    canvasWidth: 160,
    canvasHeight: 160,
    selectedLayoutId: 1,
    selectedObjectIds: [3],
    configValues: {
      objectSize: 19,
      objectDistance: 50,
      padding: 18,
      withRandomSize: false,
      randomizeSizeStrength: 4,
      withRandomPosition: false,
      randomizePositionStrength: 10,
      withRotation: false,
      rotationStrength: 45,
      withRandomRotation: false,
      withBlur: false,
      blurStrength: 5,
      withRandomColor: false
    },
    configColors: {
      backgroundColor: { type: "solid", values: ["#fff", "#ccc"] },
      objectColors: [
        {
          type: "linear",
          values: [
            { r: 123, g: 245, b: 116, a: 1 },
            { r: 218, g: 255, b: 215, a: 1 }
          ],
          angle: 0
        },
        {
          type: "linear",
          values: [
            { r: 251, g: 132, b: 91, a: 1 },
            { r: 255, g: 179, b: 185, a: 1 }
          ],
          angle: 0
        },
        {
          type: "linear",
          values: [
            { r: 147, g: 49, b: 253, a: 1 },
            { r: 255, g: 179, b: 185, a: 1 }
          ],
          angle: 0
        },
        {
          type: "linear",
          values: [
            { r: 57, g: 193, b: 255, a: 1 },
            { r: 160, g: 223, b: 253, a: 1 }
          ],
          angle: 0
        },
        { type: "linear", values: ["#ffb347", "#ffcc33"], angle: 0 }
      ]
    }
  },
  {
    id: 9,
    canvasWidth: 600,
    canvasHeight: 600,
    selectedLayoutId: 5,
    selectedObjectIds: [-1, -2, -3, -5, -6],
    configValues: {
      objectSize: 10,
      explosionForce: 62,
      cellWidth: 78,
      cellPadding: 50,
      padding: 10,
      withRandomSize: true,
      randomizeSizeStrength: 8.6,
      withRotate: true,
      withBlur: true,
      randomizeBlurStrength: 1,
      withRandomColor: false,
      withRandomObjectOrder: false,
      currentRandomSnapshot: 0.8835994599290684
    },
    configColors: {
      backgroundColor: {
        type: "linear",
        values: ["#CFD9DF", "#E2EBF0"],
        angle: 0
      },
      objectColors: [{ type: "solid", values: ["#000", "#ccc"] }]
    }
  },
  {
    id: 10,
    canvasWidth: 600,
    canvasHeight: 600,
    selectedLayoutId: 5,
    selectedObjectIds: [-1],
    configValues: {
      objectSize: 36,
      explosionForce: 20,
      cellWidth: 145,
      cellPadding: 63,
      padding: 10,
      withRandomSize: true,
      randomizeSizeStrength: 4,
      withRotate: true,
      withBlur: true,
      randomizeBlurStrength: 16,
      withRandomColor: false,
      withRandomObjectOrder: false,
      currentRandomSnapshot: 0.365057953165856
    },
    configColors: {
      backgroundColor: {
        type: "linear",
        values: [{ r: 252, g: 218, b: 159, a: 1 }, "#FCB69F"],
        angle: 0,
        xShift: 26,
        yShift: 0
      },
      objectColors: [{ type: "solid", values: ["#000", "#ccc"] }]
    },
    uploadedObjects: [
      {
        id: -1,
        src: "😍",
        type: "emoji"
      }
    ]
  },
  {
    id: 11,
    canvasWidth: 600,
    canvasHeight: 600,
    selectedLayoutId: 2,
    selectedObjectIds: [17, 3],
    configValues: {
      objectSize: 17,
      columnCount: 6,
      rowCount: 24,
      padding: 7,
      withRandomSize: true,
      randomizeSizeStrength: 1.6,
      withRandomColor: false,
      withRandomObjectOrder: true
    },
    configColors: {
      backgroundColor: {
        type: "linear",
        values: ["#09203f", "#537895"],
        angle: 0
      },
      objectColors: [
        {
          type: "linear",
          values: [
            { r: 254, g: 231, b: 205, a: 1 },
            { r: 254, g: 186, b: 165, a: 1 }
          ],
          angle: 7
        },
        { type: "linear", values: ["#ff9966", "#ff5e62"], angle: 0 }
      ]
    }
  },
  {
    id: 12,
    canvasWidth: 600,
    canvasHeight: 600,
    selectedLayoutId: 1,
    selectedObjectIds: [3, 17],
    configValues: {
      objectSize: 25,
      objectDistance: 96,
      padding: 7,
      withRandomSize: true,
      randomizeSizeStrength: 6.2,
      withRandomPosition: false,
      randomizePositionStrength: 10,
      withRotation: false,
      rotationStrength: 45,
      withRandomRotation: false,
      withBlur: false,
      blurStrength: 5,
      withRandomColor: false,
      withRandomObjectOrder: false,
      currentRandomSnapshot: 0.37740493312229795
    },
    configColors: {
      backgroundColor: {
        type: "linear",
        values: [
          { r: 229, g: 251, b: 255, a: 1 },
          { r: 253, g: 234, b: 229, a: 1 }
        ],
        angle: 46
      },
      objectColors: [
        {
          type: "linear",
          values: [
            { r: 254, g: 231, b: 205, a: 1 },
            { r: 254, g: 186, b: 165, a: 1 }
          ],
          angle: 7
        }
      ]
    }
  },
  {
    id: 13,
    canvasWidth: 600,
    canvasHeight: 600,
    selectedLayoutId: 1,
    selectedObjectIds: [3, 17],
    configValues: {
      objectSize: 25,
      objectDistance: 96,
      padding: 7,
      withRandomSize: true,
      randomizeSizeStrength: 4.6,
      withRandomPosition: true,
      randomizePositionStrength: 40,
      withRotation: true,
      rotationStrength: 24,
      withRandomRotation: false,
      withBlur: false,
      blurStrength: 5,
      withRandomColor: false,
      withRandomObjectOrder: false,
      currentRandomSnapshot: 0.4408447985398183
    },
    configColors: {
      backgroundColor: {
        type: "linear",
        values: [
          { r: 229, g: 251, b: 255, a: 1 },
          { r: 253, g: 234, b: 229, a: 1 }
        ],
        angle: 46
      },
      objectColors: [
        {
          type: "linear",
          values: [
            { r: 254, g: 231, b: 205, a: 1 },
            { r: 254, g: 186, b: 165, a: 1 }
          ],
          angle: 7
        },
        {
          type: "linear",
          values: [
            { r: 254, g: 186, b: 165, a: 1 },
            { r: 250, g: 211, b: 251, a: 1 }
          ],
          angle: 7
        }
      ]
    }
  },
  {
    id: 14,
    canvasWidth: 600,
    canvasHeight: 600,
    selectedLayoutId: 3,
    selectedObjectIds: [3],
    configValues: {
      objectSize: 38,
      itemsMargin: 54,
      circlesMargin: 60,
      sizeDecrement: 1,
      padding: 6,
      withRandomColor: false,
      withRandomObjectOrder: false
    },
    configColors: {
      backgroundColor: {
        type: "linear",
        values: [
          { r: 64, g: 74, b: 164, a: 1 },
          { r: 236, g: 78, b: 151, a: 1 }
        ],
        angle: 104
      },
      objectColors: [
        {
          type: "linear",
          values: [
            { r: 254, g: 189, b: 29, a: 1 },
            { r: 251, g: 91, b: 15, a: 1 }
          ],
          angle: 0
        }
      ]
    }
  },
  {
    id: 15,
    canvasWidth: 600,
    canvasHeight: 600,
    selectedLayoutId: 7,
    selectedObjectIds: [-1],
    configValues: {
      objectSize: 64,
      objectDistance: 100,
      padding: 16,
      withRandomSize: false,
      randomizeSizeStrength: 4,
      withRandomColor: false,
      withRandomObjectOrder: false
    },
    configColors: {
      backgroundColor: {
        type: "linear",
        values: [
          { r: 67, g: 77, b: 166, a: 1 },
          { r: 234, g: 143, b: 186, a: 1 }
        ],
        angle: 116
      },
      objectColors: [
        {
          type: "linear",
          values: [
            { r: 67, g: 77, b: 166, a: 1 },
            { r: 234, g: 143, b: 186, a: 1 }
          ],
          angle: -63
        }
      ]
    },
    uploadedObjects: [
      {
        id: -1,
        src: "/uploads/2.svg",
        type: "image/svg+xml"
      }
    ]
  },
  {
    id: 16,
    canvasWidth: 600,
    canvasHeight: 600,
    selectedLayoutId: 1,
    selectedObjectIds: [-1],
    configValues: {
      objectSize: 100,
      objectDistance: 88,
      padding: 10,
      withRandomSize: false,
      randomizeSizeStrength: 1.6,
      withRandomPosition: false,
      randomizePositionStrength: 58,
      withRotation: true,
      rotationStrength: 32,
      withRandomRotation: false,
      withBlur: false,
      blurStrength: 5,
      withRandomColor: false,
      withRandomObjectOrder: false
    },
    configColors: {
      backgroundColor: {
        type: "linear",
        values: ["#f83600", "#f9d423"],
        angle: -68
      },
      objectColors: [
        { type: "linear", values: ["#f83600", "#f9d423"], angle: 0 }
      ]
    },
    uploadedObjects: [
      {
        id: -1,
        src: "/uploads/3.svg",
        type: "image/svg+xml"
      }
    ]
  },
  {
    id: 17,
    canvasWidth: 600,
    canvasHeight: 600,
    selectedLayoutId: 1,
    selectedObjectIds: [-1],
    configValues: {
      objectSize: 100,
      objectDistance: 76,
      padding: 10,
      withRandomSize: true,
      randomizeSizeStrength: 14,
      withRandomPosition: true,
      randomizePositionStrength: 4,
      withRotation: true,
      rotationStrength: 172,
      withRandomRotation: true,
      withBlur: false,
      blurStrength: 5,
      withRandomColor: false,
      withRandomObjectOrder: false,
      currentRandomSnapshot: 0.11445337081804019
    },
    configColors: {
      backgroundColor: {
        type: "linear",
        values: ["#0ba360", "#3cba92"],
        angle: 0
      },
      objectColors: [
        { type: "linear", values: ["#f83600", "#f9d423"], angle: 0 },
        { type: "linear", values: ["#fddb92", "#d1fdff"], angle: 0 }
      ]
    },
    uploadedObjects: [
      {
        id: -1,
        src: "/uploads/3.svg",
        type: "image/svg+xml"
      }
    ]
  },
  {
    id: 18,
    canvasWidth: 600,
    canvasHeight: 600,
    selectedLayoutId: 3,
    selectedObjectIds: [2],
    configValues: {
      objectSize: 100,
      itemsMargin: 10,
      circlesMargin: 20,
      sizeDecrement: 7,
      padding: 0,
      withRandomColor: false,
      withRandomObjectOrder: false
    },
    configColors: {
      backgroundColor: {
        type: "linear",
        values: ["#35c8cb", "#7b2dd6"],
        angle: 0
      },
      objectColors: [
        { type: "linear", values: ["#d4f9fe", "#b4b0be"], angle: 0 }
      ]
    }
  }
];
