const newLine = '\r\n';

export default function csv(columns, datas, separator = ',', noHeader = false) {
  let columnOrder;
  const content = [];
  const column = [];

  if (columns) {
    columnOrder = columns.map(v => {
      if (!noHeader) {
        column.push(v.label);
      }
      return v.name;
    });

    if (column.length > 0) {
      content.push(column.join(separator));
    }
  }
  else {
    columnOrder = [];
    datas.forEach(v => {
      if (!Array.isArray(v)) {
        columnOrder = columnOrder.concat(Object.keys(v));
      }
    });
    if (columnOrder.length > 0) {
      columnOrder = columnOrder.filter((value, index, self) => self.indexOf(value) === index);

      if (!noHeader) {
        content.push(columnOrder.join(separator));
      }
    }
  }

  if (Array.isArray(datas)) {
    datas.map(v => {
      if (Array.isArray(v)) {
        return v;
      }
      return columnOrder.map(k => {
        if (typeof v[k] !== 'undefined') {
          return v[k];
        }
        return '';
      });
    }).forEach(v => {
      content.push(v.join(separator));
    });
  }
  return content.join(newLine);
}
