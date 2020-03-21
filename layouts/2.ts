import { ConfigFieldType, Layout } from "../types";
import { beforeAll, beforeBooleans } from "./_shared";

export default {
  id: 2,
  src: "/layout_thumbs/2.png",
  configFields: [
    ...beforeAll,
    {
      name: "columnCount",
      label: "Column Count",
      type: ConfigFieldType.NumberInput,
      defaultValue: 7,
      minValue: 1,
      maxValue: 50
    },
    {
      name: "rowCount",
      label: "Row Count",
      type: ConfigFieldType.NumberInput,
      defaultValue: 3,
      minValue: 1,
      maxValue: 50
    },
    ...beforeBooleans
  ],
  generate: (width, height, configValues) => {
    const { columnCount, rowCount } = configValues;

    const px = width / columnCount;
    const py = height / rowCount;
    const items = [];
    for (let i = 0; i <= columnCount; i++) {
      for (let j = 0; j <= rowCount; j++) {
        const top = j * py;
        const left = i * px;
        items.push({ top, left });
      }
    }

    return items;
  }
} as Layout;
