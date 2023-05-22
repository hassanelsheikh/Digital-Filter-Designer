const Time = [];
const Amplitude = [];
const fileInput = document.getElementById('sig');
fileInput.addEventListener('change', importSignal);
function importSignal() {
    // Get the selected file
    const fileInput = document.getElementById('sig');
    const file = fileInput.files[0];

    // Create a new FileReader object
    const reader = new FileReader();

    // Define a callback function to handle the file data
    reader.onload = (event) => {
        // Get the file data as a string
        const fileData = event.target.result;

        // Split the string into lines
        const lines = fileData.split(/\r?\n/);

        // Clear the existing data, to reset if added new file
        Time.length = 0;
        Amplitude.length = 0;
        

        // Loop through the lines and split each line into columns
        for (let i = 0; i < lines.length; i++) {
            const columns = lines[i].split(',');

            // Store the column values in their respective arrays
            Time.push(columns[0]);
            Amplitude.push(columns[1]);
        }
        console.log(Amplitude);
    }
        reader.readAsText(file);
    }
    
