const Time = [];
const Amplitude = [];
const fileInput = document.getElementById('sig');
const inputGraph = document.getElementById('input_sig')
const outputGraph = document.getElementById('output_sig')

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

    let plot_input_Output = (inputPoint, outputPoint, t)=>{

        Plotly.extendTraces(inputGraph, {y:[[inputPoint]], x:[[t]]}, [0])
        Plotly.extendTraces(outputGraph, {y:[[outputPoint]], x:[[t]]}, [0])
        // t+=0.02
        range = {range:[t-4.5, t+0.5]}
         layout['xaxis']= range
        if(t>4.5){
            Plotly.relayout(inputGraph, layout)
            Plotly.relayout(outputGraph, layout)
        }
    }

    fileInput.onchange = (e)=>{
        let x = [];
        let y = [];
        let file = e.target.files[0];
        // let data = d3.csvParse(file);
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function (event) {
            var csvData = event.target.result;
            let parsedCSV = d3.csvParse(csvData);
            let keys = Object.keys(parsedCSV[0]);
            parsedCSV.forEach(function (d, i) {
                // if (i == 0) return true; // skip the header
                x.push(d[keys[0]]);
                y.push(d[keys[1]]);
            });
            layout = {xaxis:{range:[0,5]}}
            Plotly.newPlot(inputGraph, [{y:[],x:[], type:'line'}], {xaxis:{range:[0,5]}, title:"input signal"})
            Plotly.newPlot(outputGraph, [{y:[],x:[], type:'line'}], {xaxis:{range:[0,5]}, title:"Filtered signal"})
            t = 0
            i = 0
            // if(working){
            //     clearInterval(interval)
            // }
            // working = true
            interval = setInterval(()=>{
                if(i<y.length){
                    let filtered_point = update_output(y[i]);
                    plot_input_Output(y[i], filtered_point, x[i])
                    i+=30
                }
                else{
                    clearInterval(interval)
                    working = false
                }
            }, 100)
      }
      }

    
      let update_output = (signalPoint)=>{
        let signalOutput
        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:5000//applyFilter',
            data: JSON.stringify({signalPoint}),
            cache: false,
            dataType: 'json',
            async: false,
            contentType: 'application/json',
            processData: false,
            success: function(data) {
                signalOutput = data[0];
              
            },
        });
        return signalOutput
    }