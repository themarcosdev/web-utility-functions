/**
 * Generates a table accordion using a button
 *
 * @param {HTMLElement} btnOnTableTd - The button element on the table cell.
 * @param {string} btnClassToExpand - The class name of the buttons to expand.
 * @param {string} [customAccordionHTML='TEST ACCORDION'] - The custom HTML for the accordion.
 * @returns {boolean} Returns false if the button element is not found or not a button element.
 */
function accordionTable (btnOnTableTd, btnClassToExpand, customAccordionHTML = 'TEST ACCORDION'){
    if (!btnOnTableTd || btnOnTableTd.nodeName != 'BUTTON') {
        return false;
    }

    btnOnTableTd.innerHTML= '+';
    btnOnTableTd.title = 'See More';

    let line = btnOnTableTd.closest('tr');

    let hideTableAccordionDetails = false;
    if (document.getElementById('trLineDetail')) {
        document.getElementById('trLineDetail')?.remove();
        hideTableAccordionDetails = true;
    }

    for(let item of document.getElementsByClassName(btnClassToExpand)){
        if (item.innerHTML.includes('-')) {
            item.innerHTML = '+';
            item.title = 'See more';
        }
    }

    if (line?.nextElementSibling?.id != 'trLineDetail') {
        let htmlNewLine = `
            <tr id="trLineDetail" class="bg-secondary text-white border border-dark border-3">
                <td colspan="${btnOnTableTd.closest('table').getElementsByTagName('th').length}">
                    <div id="divLineAccordionDetail" class="justify-content-center text-center">
                        ${customAccordionHTML}
                    </div>
                </td>
            </tr>
        `;

        if (!hideTableAccordionDetails) {
            insertNewLineInTable(document.getElementById('tableMain'), line, 1, htmlNewLine);
            btnOnTableTd.innerHTML = '-';
            btnOnTableTd.title = 'See Less';
        } else {
            document.getElementById('trLineDetail')?.remove();
        }
    } else {
        line.nextElementSibling.remove();
    }

}

/**
 * A function listener into a  button class to use accordion
 *
 * @param {string} btnClass - The class name of the buttons to listen for click events.
 */
function accordionTableBtnListenerClick(btnClass){
    for (let item of document.getElementsByClassName(btnClass)) {
        item.addEventListener('click', ()=>{
            accordionTable(item, btnClass);
        });
    }
}


/**
 * Creates a new line at the top of a table.
 *
 * @param {Element} table - The table element to insert the line into.
 * @param {string} htmlLine - The HTML content of the line to insert.
 * @return {boolean} Returns true if the line was successfully inserted, false otherwise.
 */
function createLineAtTableTop (table, htmlLine) {
    if (!table || table.nodeName != 'TABLE') {
        return false;
    }

    table.insertAdjacentHTML("afterBegin", htmlLine);
}

/**
 * Downloads an HTML table as a CSV file.
 *
 * @param {HTMLElement} table - The HTML table element to download.
 * @param {string} separator - The CSV separator character. Defaults to ','.
 * @param {string} filename - The name of the downloaded file. Defaults to 'tab_Download_' + current date.
 */
function downloadHTMLTableAsCSV (table, separator = ',', filename = 'tab_Download_' + new Date().toLocaleDateString()) {
    let rows = table.querySelectorAll(' tr');

    let csv = [];
    for (const element of rows) {
        let row = [],
            cols = element.querySelectorAll('td, th');
        for (const element of cols) {
            let data = element.innerText.replace(/(\r\n|\n|\r)/gm, '').replace(/(\s\s)/gm, ' ')
            data = data.replace(/"/g, '""');
            row.push('"' + data + '"');
        }
        csv.push(row.join(separator));
    }
    let csv_string = csv.join('\n');

    filename += '.csv';
    let link = document.createElement('a');
    link.style.display = 'none';
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv_string));
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

/**
 * Find the last cell with the searched value in a table.
 *
 * @param {Object} table - The table object to search in.
 * @param {string} valueSearched - The value to search for.
 * @return {Object|null} - The last cell with the searched value, or null if not found.
 */
function findLastCellWithSeachedValueInTable(table, valueSearched){
    if (!table || table.nodeName != 'TABLE') {
        return 'Inform a valid table';
    }

    if (!valueSearched) {
        return 'Inform a value searched';
    }

    let lastTableCell = null;
    for (let item of document.getElementsByTagName('td')) {
        if (item.textContent == valueSearched){
            lastTableCell = item ;
        }

        if (lastTableCell && item.textContent != valueSearched) {
            break;
        }
    }

    return lastTableCell ;
}

/**
 * Fixes the position of the table head based on the scroll position.
 *
 * @param {Element} table - The table element to fix the position of the head.
 */
function fixTableHeadPosition(table){
    if (!table || table.nodeName != 'TABLE') {
        return 'Inform a valid table';
    }

    const fixTheads = function() {
        let arrPxW = [];
        let arrPxH = [];
        let firstLineHeight = table.getElementsByTagName("tr")[0].getBoundingClientRect().top;
        if ((document.body.scrollTop > firstLineHeight || document.documentElement.scrollTop > firstLineHeight)) {
            for (const element of table.getElementsByTagName("thead")[0].getElementsByTagName('th')) {
                arrPxW.push(element.getClientRects()[0].width);
                arrPxH.push(element.getClientRects()[0].height);
            }

            let altHeader = 0;
            altHeader     = table.getElementsByTagName("thead")[0].getClientRects()[0].height;
            table.getElementsByTagName("thead")[0].style.top      = `${altHeader}px`;
            table.getElementsByTagName("thead")[0].style.position = 'fixed';
            table.getElementsByTagName("thead")[0].style.zIndex   = '999';
            table.getElementsByTagName("thead")[0].style.width    = '100%';

            /**
                table.getElementsByTagName("thead")[0].style.overflowWrap = 'break-word';
                table.getElementsByTagName("thead")[0].style.wordBreak = 'break-word';
            */

            for (let item of table.getElementsByTagName("thead")[0].getElementsByTagName('th')) {
                item.style.width    = `${arrPxW[item]}px`;
                item.style.maxWidth = `${arrPxW[item]}px`;
                item.style.minWidth = `${arrPxW[item]}px`;
                item.style.height   = `${arrPxH[item]}px`;
            }

        } else {
            table.getElementsByTagName("thead")[0].style.position = 'initial';
        }
    }

    window.addEventListener('scroll', fixTheads);
}

/**
 * Filters table lines based on the value searched in a specific column.
 *
 * @param {Element} table - The table element to be filtered.
 * @param {number} columnIndex - The index of the column to be filtered. (start at 1)
 * @param {string} valueSearched - The value to be searched in the column.
 */
function hideTableLinesPerColumnsSearch(table, columnIndex, valueSearched) {
    if (!table || table.nodeName != 'TABLE') {
        return false;
    }

    let selectIndex = null;
    if (Array.isArray(columnIndex)) {
        indexes = [];
        for(let item of columnIndex) {
            indexes.push(`td:nth-child(${item})`);
        }
        selectIndex = indexes.join(', ');
    } else {
        selectIndex = `td:nth-child(${columnIndex})`;
    }

    console.log(selectIndex);
    const cells = table.querySelectorAll(`${selectIndex}`);

    console.log(cells);
    for (let cell of cells){
        cell.parentElement.classList.remove('d-none');
        if (valueSearched == '<-- show all -->') {
            // Just reset cells and dont filter;
            continue;
        }

        if (cell.textContent.trim().toLowerCase().includes(valueSearched.trim().toLowerCase())) {
            cell.parentElement.classList.remove('d-none');
        } else {
            cell.parentElement.classList.add('d-none');
        }
    };
}

/**
 * Hide and filter table data based on user input.
 *
 * @param {HTMLElement} input - The input element to listen for input events.
 */
function hideAndFilterTableData(input) {
    if (!input || input.nodeName != 'INPUT') {
        return false;
    }

    input.addEventListener('input', (ev)=>{
        hideTableLinesPerColumnsSearch(document.getElementById('tableMain'), 2, ev.target.value);
    });
}

/**
 * Insert a new Line into a specific position on table
 * @param table The table element on DOM
 * @param referenceLine reference of a TR on DOM, can be a nº of TR index or any TR element on DOM
 * @param position +1 ..., -1... (rowIndex) at referenceLine
 * @param htmlLine the HTML of new Line
 * @returns void
 * 
 * @example insertNewLineInTable(tableMain, 0, 3, '<tr><td colspan="16">test</td></tr>');
 * @example insertNewLineInTable(tableMain, myTRElement, -10, '<tr><td colspan="16">test</td></tr>');
 */
function insertNewLineInTable(table, referenceLine, position , htmlLine) {
    try { 
        if (!table || table.nodeName != 'TABLE') {
            return false;
        }

        if (referenceLine != 0) {
            if (!referenceLine || (+referenceLine == !isNaN() && referenceLine.nodeName != 'TR')) {
                return false;
            }
        }

        let rowNum = false;

        if (referenceLine.nodeName == 'TR') {
            rowNum = +referenceLine.rowIndex + +`${position}`;
        } else {
            rowNum = referenceLine + +`${position}`;
        }

        let newLine = table.insertRow(`${+rowNum}`);

        newLine.outerHTML = htmlLine;
    } catch(err){
        return 'Error on function: ' +  err;
    }
}


/**
 * Moves the focus between cells in a table.
 *
 * @param {Element} table - The table element.
 * @param {boolean} [transformCellsIntoContentEditable = false] - Whether to transform cells into content editable.
 * (table cells need be contentEditable to use moveIntoCells)
 */
function moveIntoCells (table, transformCellsIntoContentEditable = false) {
    if (!table || table.nodeName != 'TABLE') {
        return false;
    }

    if (transformCellsIntoContentEditable) {
        for (let item of table.getElementsByTagName('td')){
            item.contentEditable = true;
        }
    }

    const returnFocusedRow = function() {
        for (let i = 0; i < document.getElementsByTagName("tr").length; i++) {
            if (document.activeElement.parentElement == document.getElementsByTagName("tr")[i]) {
                return i;
            }
        }
    }

    const moveInCells = function(e) {
        let pos = document.activeElement.cellIndex;
        let row = returnFocusedRow();
        let ttrow = document.getElementsByTagName("tr").length - 1; //-1 (first tr with th);
        let ttth = document.getElementsByTagName("th").length - 1; // -1 (we start on cell 0);

        if (e.keyCode == '38') {
            // move up;
            if (row > 1) {
                document.activeElement.parentElement.previousElementSibling.getElementsByTagName("td")[pos].focus();
            }
        } else if (e.keyCode == '40') {
            // move down :
            if (row < ttrow) {
                document.activeElement.parentElement.nextElementSibling.getElementsByTagName("td")[pos].focus();
            }
        } else if (e.keyCode == '37') {
            // move left ;
            if (pos > 0) {
                document.activeElement.previousElementSibling.focus();
            }
        } else if (e.keyCode == '39') {
            // move right;
            if (pos < ttth) {
                document.activeElement.nextElementSibling.focus();
            }
        }
    }

    table.addEventListener("keydown", moveInCells);

}

/**
 *  Sum the table columns indexSumColumn using indexGroupingColumnName as agrouper
    @param {number} indexGroupingColumnName = index of column to group by ;
    @param {number} indexSumColumn          = index of column to sum ;

    @example sumColumnsInTableHTML(document.getElementById('idTable'), 0, 2);
*/
function sumColumnsInTableHTML(table, indexGroupingColumnName, indexSumColumn) {
    if (!table || table.nodeName != 'TABLE') {
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
                if (columnIndex == indexGroupingColumnName) {
                    if (!counts[columns[indexGroupingColumnName].textContent]) {
                        counts[columns[indexGroupingColumnName].textContent] = 0;
                    }
                    counts[columns[indexGroupingColumnName].textContent] +=
                        +columns[indexSumColumn].textContent.replaceAll(',00', '').replace(/\D/g, '');
                }
                columnIndex++;
            }
        }
        rowIndex++;
    }

    return counts;
}
