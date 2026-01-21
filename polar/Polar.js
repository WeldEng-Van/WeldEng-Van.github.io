const fs = require('fs');
const path = require('path');
const { title } = require('process');

document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.getElementById('AddSec-btn');
    const removeBtn = document.getElementById('Remove-btn');
    const fileInput = document.getElementById('wpd-input');
    const table = document.querySelector("table");

    if (!addBtn || !removeBtn || !fileInput || !table) {
        console.error("Elements not found");
        return;
    }

    // open file picker
    addBtn.addEventListener('click', () => {
        fileInput.click();
    });

    // simulate upload
    async function uploadFiles(files) {
       const process_dir = "C:/Users/Shifak.Shafi/OneDrive - Seaspan/Documents/JSS & Polar WPS HTML/HTML Code/public/Polar WPDs HTML/Processes";
       try {

        if (!files) return res.status(400).send('No file uploaded.');
       
        const tempPath = "C:/Users/Shifak.Shafi/OneDrive - Seaspan/Documents/JSS & Polar WPS HTML/HTML Code/uploads";
        const filename = title;
        const destPath = path.join(pdfDir, stage, reqType, filename);

        // Make folder if it doesn't exist
        fs.mkdirSync(path.dirname(destPath), { recursive: true });

        // Move file from temp to destination
        fs.renameSync(tempPath, destPath);

        res.send(`File "${filename}" uploaded successfully!`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error uploading file.');
    }}


    // add a new cell
    function addNewWPDCell(title, fileUrl) {
        let lastRow = table.rows[table.rows.length - 1];
        if (!lastRow || lastRow.cells.length >= 3) {
            lastRow = table.insertRow(-1);
        }

        const cell = lastRow.insertCell(-1);
        cell.innerHTML = `
            <a href="${fileUrl}" target="_blank">
                <figcaption>${title}</figcaption>
                <img src="https://placehold.co/200x200">
            </a>`;
    }

    // when file selected
    fileInput.addEventListener('change', async (event) => {
        const files = event.target.files;
        if (!files.length) return;

        const title = prompt("Enter a name/title for this WPD:");
        if (!title) return alert("Canceled");

        const fileUrl = await uploadFiles(files);
        addNewWPDCell(title, fileUrl);
    });

    // Remove Section by title
    removeBtn.addEventListener('click', () => {
        const titleToRemove = prompt("Enter the title of the section to remove:");
        if (!titleToRemove) return alert("Canceled");

        let found = false;

        // Loop through all rows and cells
        for (let r = 0; r < table.rows.length; r++) {
            const row = table.rows[r];
            for (let c = 0; c < row.cells.length; c++) {
                const cell = row.cells[c];
                const caption = cell.querySelector('figcaption');
                if (caption && caption.textContent.trim() === titleToRemove.trim()) {
                    row.deleteCell(c);
                    found = true;

                    // Remove row if empty
                    if (row.cells.length === 0) {
                        table.deleteRow(r);
                    }
                    break;
                }
            }
            if (found) break;
        }

        if (!found) {
            alert(`No section found with title: "${titleToRemove}"`);
        }
    });
});
