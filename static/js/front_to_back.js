const filterDesignMagnitude = document.querySelector('#filter-mag-response')
const filterDesignPhase = document.querySelector('#filter-phase-response')

layout ={
    paper_bgcolor:"white",
    plot_bgcolor:"white",
    autosize: false,
    width:500,
    height:250,

    margin: {
      l: 30,
      r: 0,
      b: 20,
      t: 10,
      pad: 0
    }
}
Plotly.newPlot(
    filterDesignMagnitude,
    [{ x: [], y: [], line: { color: 'red' } } ],
    layout,
   { staticPlot: true })
    
Plotly.newPlot(
    filterDesignPhase,
    [{ x: [], y: [], line: { color: 'red' } }, ],
    layout,
   { staticPlot: true })







async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    return response.json()
}

async function updateFilterDesign(data) {
    data.gain = 1
     console.log("data");
    let { w, angels, magnitude } = await postData(`${API}/getFilter`, data)
   Plotly.newPlot(
        filterDesignMagnitude,
        [{ x: w, y: magnitude, line: { color: 'red' } } ],
        layout,
       { staticPlot: true })
        
    Plotly.newPlot(
        filterDesignPhase,
        [{ x: w, y: angels, line: { color: 'red' } }, ],
        layout,
       { staticPlot: true })
       Plotly.newPlot(
        final,
        [{ x: w, y: angels, line: { color: 'red' } }, ],
        layout,
       { staticPlot: true })

  
}



async function applyfilter(data) {
    let { output } = await postData(`${API}/applyFilter`, data)
    return output
}
