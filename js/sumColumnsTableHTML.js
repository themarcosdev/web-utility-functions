/**
  @example: sumColumnsTableHTML(document.getElementById('idTable'), 0, 2);
  groupingColumn = index of column to group by ;
  sumColumn      = index of column to sum ;
*/
window.sumColumnsTableHTML = function(table, groupingColumn, sumColumn) {
    if (!table) {
        return false;
    }

    let counts = {};
    let rows = table.getElementsByTagName('tr');

    let rowIndex = 0;
    for (let row of rows) {
        if (rowIndex > 0) {
            let columns = row.getElementsByTagName('td');
            let columnIndex = 0;
            for (let column of columns) {
                if (columnIndex == groupingColumn) {
                    if (!counts[columns[groupingColumn].textContent]) {
                        counts[columns[groupingColumn].textContent] = 0;
                    }
                    counts[columns[groupingColumn].textContent] +=
                        +columns[sumColumn].textContent.replaceAll(',00', '').replace(/\D/g, '');
                }
                columnIndex++;
            }
        }
        rowIndex++;
    }

    return counts;
}
